import connectDB from "@/lib/db";
import { randomBytes } from "node:crypto";
const fields = ["fullName", "email", "phone", "message", "firstName", "lastName", "role", "company", "linkedin"];
const normalize = row => row ? { ...row, isRead: Boolean(row.isRead) } : null;
export default {
  async create(data) {
    const db = await connectDB();
    const id = randomBytes(12).toString("hex");
    db.prepare("INSERT INTO contacts (_id, " + fields.join(", ") + ", createdAt) VALUES (?, " + fields.map(() => "?").join(", ") + ", ?)").run(id, ...fields.map(field => data[field] ?? null), new Date().toISOString());
    return this.findById(id);
  },
  async findById(id) { return normalize((await connectDB()).prepare("SELECT * FROM contacts WHERE _id = ?").get(id)); },
  find() { return { sort() { return { async lean() { return (await connectDB()).prepare("SELECT * FROM contacts ORDER BY createdAt DESC").all().map(normalize); } }; } }; },
  async findByIdAndUpdate(id, data) {
    (await connectDB()).prepare("UPDATE contacts SET isRead = ? WHERE _id = ?").run(Number(data.isRead), id);
    return this.findById(id);
  },
  async findByIdAndDelete(id) {
    const db = await connectDB();
    const row = await this.findById(id);
    db.prepare("DELETE FROM contacts WHERE _id = ?").run(id);
    return row;
  },
};
