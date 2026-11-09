import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";

loadEnvConfig(process.cwd());
if (!process.env.SQLITE_PATH || !process.env.MONGODB_URI) throw new Error("Set SQLITE_PATH and MONGODB_URI in .env before migrating");
const db = new DatabaseSync(path.resolve(process.env.SQLITE_PATH));
const fields = ["fullName", "email", "phone", "message", "firstName", "lastName", "role", "company", "linkedin"];
try {
  db.exec("CREATE TABLE IF NOT EXISTS admins (_id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdAt TEXT NOT NULL); CREATE TABLE IF NOT EXISTS contacts (_id TEXT PRIMARY KEY, fullName TEXT, email TEXT, phone TEXT, message TEXT, firstName TEXT, lastName TEXT, role TEXT, company TEXT, linkedin TEXT, isRead INTEGER NOT NULL DEFAULT 0, createdAt TEXT NOT NULL);");
  await mongoose.connect(process.env.MONGODB_URI);
  const [admins, contacts] = await Promise.all([
    mongoose.connection.db.collection("admins").find().toArray(),
    mongoose.connection.db.collection("contacts").find().toArray(),
  ]);
  db.exec("BEGIN IMMEDIATE");
  try {
    if (db.prepare("SELECT 1 FROM admins LIMIT 1").get() || db.prepare("SELECT 1 FROM contacts LIMIT 1").get()) throw new Error("SQLite database is not empty; migration requires empty tables");
    const insertAdmin = db.prepare("INSERT INTO admins VALUES (?, ?, ?, ?)");
    const insertContact = db.prepare("INSERT INTO contacts (_id, " + fields.join(", ") + ", isRead, createdAt) VALUES (?, " + fields.map(() => "?").join(", ") + ", ?, ?)");
    for (const a of admins) insertAdmin.run(String(a._id), a.email, a.password, new Date(a.createdAt).toISOString());
    for (const c of contacts) insertContact.run(String(c._id), ...fields.map(field => c[field] ?? null), Number(Boolean(c.isRead)), new Date(c.createdAt).toISOString());
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  console.log("Migrated " + admins.length + " admins and " + contacts.length + " contacts.");
} finally {
  await mongoose.disconnect();
  db.close();
}
