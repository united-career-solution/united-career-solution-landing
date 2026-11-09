import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
export default {
  async findOne({ email }) {
    const db = await connectDB();
    const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
    return admin && { ...admin, comparePassword: password => bcrypt.compare(password, admin.password) };
  },
};
