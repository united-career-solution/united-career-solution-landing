// Quick script to reset the admin user
// Run: node scripts/reset-admin.mjs

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb://localhost:27017/website_backend";

async function resetAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Drop existing admins
    await mongoose.connection.db.collection("admins").deleteMany({});
    console.log("Deleted existing admins");

    // Create new admin with properly hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await mongoose.connection.db.collection("admins").insertOne({
      email: "admin@example.com",
      password: hashedPassword,
      createdAt: new Date(),
    });
    console.log("Created new admin: admin@example.com / admin123");

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resetAdmin();
