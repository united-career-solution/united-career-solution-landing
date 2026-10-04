import connectDB from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { verifyAdmin } from "@/lib/adminAuth";

/**
 * GET /api/admin/contacts
 * Retrieve all contact form submissions (newest first).
 * Authentication: Admin JWT required.
 */
export async function GET(request) {
  const authResult = verifyAdmin(request);
  if (authResult.error) return authResult.error;

  try {
    await connectDB();

    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return successResponse(
      contacts,
      "Contacts retrieved successfully"
    );
  } catch (error) {
    console.error("Admin contacts GET error:", error);
    return errorResponse("Failed to retrieve contacts", 500);
  }
}
