import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

/**
 * Cached connection to prevent multiple connections during hot reload.
 * In development, Next.js clears Node.js cache on every request,
 * so we use a global variable to preserve the connection.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Seed default admin user if one doesn't exist.
 */
async function seedAdmin() {
  try {
    // Dynamic import to avoid circular dependency issues
    const { default: Admin } = await import("@/lib/models/Admin");

    const existingAdmin = await Admin.findOne({});
    if (!existingAdmin) {
      const email = process.env.ADMIN_EMAIL || "admin@example.com";
      const password = process.env.ADMIN_PASSWORD || "admin123";

      // Password will be hashed by the pre-save hook in the Admin model
      await Admin.create({ email, password });
      console.log(`✅ Default admin created: ${email}`);
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
}

/**
 * Connect to MongoDB and seed admin on first connection.
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(async (mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        // Seed default admin after first connection
        await seedAdmin();
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
