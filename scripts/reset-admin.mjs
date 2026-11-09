import { loadEnvConfig } from "@next/env";
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import path from "node:path";
loadEnvConfig(process.cwd());
if (!process.env.SQLITE_PATH || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error("Set SQLITE_PATH, ADMIN_EMAIL and ADMIN_PASSWORD in .env");
const db = new DatabaseSync(path.resolve(process.env.SQLITE_PATH));
try {
  db.exec("CREATE TABLE IF NOT EXISTS admins (_id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdAt TEXT NOT NULL)");
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("DELETE FROM admins").run();
    db.prepare("INSERT INTO admins VALUES (?, ?, ?, ?)").run(randomBytes(12).toString("hex"), process.env.ADMIN_EMAIL.trim().toLowerCase(), password, new Date().toISOString());
    db.exec("COMMIT");
  } catch (error) { db.exec("ROLLBACK"); throw error; }
  console.log("Admin account reset.");
} finally { db.close(); }
