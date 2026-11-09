import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import path from "node:path";

export default async function connectDB() {
  if (!process.env.SQLITE_PATH) throw new Error("Please define SQLITE_PATH in .env");
  const filename = path.resolve(process.env.SQLITE_PATH);
  if (!globalThis.sqliteDB || globalThis.sqliteFilename !== filename) {
    const db = new DatabaseSync(filename);
    db.exec("PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS admins (_id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdAt TEXT NOT NULL); CREATE TABLE IF NOT EXISTS contacts (_id TEXT PRIMARY KEY, fullName TEXT, email TEXT, phone TEXT, message TEXT, firstName TEXT, lastName TEXT, role TEXT, company TEXT, linkedin TEXT, isRead INTEGER NOT NULL DEFAULT 0, createdAt TEXT NOT NULL);");
    globalThis.sqliteDB = db;
    globalThis.sqliteFilename = filename;
  }
  const db = globalThis.sqliteDB;
  if (!db.prepare("SELECT 1 FROM admins LIMIT 1").get()) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
    db.prepare("INSERT OR IGNORE INTO admins SELECT ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM admins)").run(randomBytes(12).toString("hex"), (process.env.ADMIN_EMAIL || "admin@example.com").trim().toLowerCase(), hash, new Date().toISOString());
  }
  return db;
}
