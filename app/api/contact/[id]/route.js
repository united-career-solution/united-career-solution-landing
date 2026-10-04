import connectDB from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import mongoose from "mongoose";

/**
 * GET /api/contact/[id]
 * Retrieve a single contact form submission by ID.
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid contact ID format", 400);
    }

    await connectDB();

    const contact = await Contact.findById(id);

    if (!contact) {
      return errorResponse("Contact not found", 404);
    }

    return successResponse(contact, "Contact retrieved successfully");
  } catch (error) {
    console.error("Contact GET by ID error:", error);
    return errorResponse("Failed to retrieve contact", 500);
  }
}
