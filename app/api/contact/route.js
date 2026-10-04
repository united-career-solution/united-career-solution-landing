import connectDB from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { validateContactInput } from "@/lib/validations/contactValidation";
import { successResponse, errorResponse } from "@/lib/responseHandler";

/**
 * POST /api/contact
 * Submit a new contact form entry.
 * Authentication: NOT required.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate inputs
    const { isValid, errors } = validateContactInput(body);
    if (!isValid) {
      return errorResponse(errors.join(", "), 400);
    }

    // Connect to database
    await connectDB();

    // Sanitize and save
    const contact = await Contact.create({
      firstName: body.firstName?.trim(),
      lastName: body.lastName?.trim(),
      email: body.email?.trim()?.toLowerCase(),
      role: body.role,
      company: body.company?.trim(),
      linkedin: body.linkedin?.trim(),
      message: body.message?.trim(),
    });

    return successResponse(
      { id: contact._id },
      "Contact form submitted successfully",
      201
    );
  } catch (error) {
    console.error("Contact POST error:", error);
    return errorResponse("Failed to submit contact form", 500);
  }
}
