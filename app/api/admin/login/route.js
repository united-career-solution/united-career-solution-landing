import connectDB from "@/lib/db";
import Admin from "@/lib/models/Admin";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "@/lib/responseHandler";

/**
 * POST /api/admin/login
 * Authenticate admin and return a JWT token.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic input validation
    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    await connectDB();

    // Find admin by email
    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });

    if (!admin) {
      return errorResponse("Email not found", 401);
    }

    // Compare password using bcrypt
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return errorResponse("Incorrect password", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return successResponse(
      { token },
      "Login successful"
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return errorResponse("Login failed", 500);
  }
}
