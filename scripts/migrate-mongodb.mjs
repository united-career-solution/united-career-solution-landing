#!/usr/bin/env node
// Requires Node.js 24 and mongosh. No npm packages are needed.
import { DatabaseSync } from "node:sqlite";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Load in Next.js order; existing environment variables always take precedence.
for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}
if (!process.env.SQLITE_PATH || !process.env.MONGODB_URI) {
  throw new Error("Set SQLITE_PATH and MONGODB_URI in the environment or .env");
}

const mongoScript = `
const source = connect(process.env.MONGODB_URI);
const fields = ["fullName", "email", "phone", "message", "firstName", "lastName", "role", "company", "linkedin"];
const admins = source.getCollection("admins").find().toArray().map(a => ({
  _id: String(a._id), email: a.email, password: a.password,
  createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt
}));
const contacts = source.getCollection("contacts").find().toArray().map(c => {
  const row = { _id: String(c._id), isRead: Boolean(c.isRead),
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt };
  for (const field of fields) row[field] = c[field] ?? null;
  return row;
});
print("__MIGRATION_DATA__" + JSON.stringify({ admins, contacts }));
`;

let output;
try {
  output = execFileSync("mongosh", ["--quiet", "--norc", "--eval", mongoScript], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "inherit"],
  });
} catch (error) {
  if (error.code === "ENOENT") throw new Error("mongosh is required and must be available on PATH");
  throw new Error("Failed to read MongoDB data with mongosh", { cause: error });
}
const line = output.split(/\r?\n/).find(value => value.startsWith("__MIGRATION_DATA__"));
if (!line) throw new Error("mongosh did not return migration data");
const { admins, contacts } = JSON.parse(line.slice("__MIGRATION_DATA__".length));
const fields = ["fullName", "email", "phone", "message", "firstName", "lastName", "role", "company", "linkedin"];
const db = new DatabaseSync(path.resolve(process.env.SQLITE_PATH));
try {
  db.exec("PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS admins (_id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdAt TEXT NOT NULL); CREATE TABLE IF NOT EXISTS contacts (_id TEXT PRIMARY KEY, fullName TEXT, email TEXT, phone TEXT, message TEXT, firstName TEXT, lastName TEXT, role TEXT, company TEXT, linkedin TEXT, isRead INTEGER NOT NULL DEFAULT 0, createdAt TEXT NOT NULL);");
  db.exec("BEGIN IMMEDIATE");
  try {
    if (db.prepare("SELECT 1 FROM admins LIMIT 1").get() || db.prepare("SELECT 1 FROM contacts LIMIT 1").get()) throw new Error("SQLite database is not empty; migration requires empty tables");
    const insertAdmin = db.prepare("INSERT INTO admins VALUES (?, ?, ?, ?)");
    const insertContact = db.prepare("INSERT INTO contacts (_id, " + fields.join(", ") + ", isRead, createdAt) VALUES (?, " + fields.map(() => "?").join(", ") + ", ?, ?)");
    for (const a of admins) insertAdmin.run(a._id, a.email, a.password, new Date(a.createdAt).toISOString());
    for (const c of contacts) insertContact.run(c._id, ...fields.map(field => c[field] ?? null), Number(c.isRead), new Date(c.createdAt).toISOString());
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  console.log("Migrated " + admins.length + " admins and " + contacts.length + " contacts.");
} finally {
  db.close();
}
