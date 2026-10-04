import connectDB from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { successResponse, errorResponse } from "@/lib/responseHandler";
import { verifyAdmin } from "@/lib/adminAuth";

export async function PATCH(request, { params }) {
    const authResult = verifyAdmin(request);
    if (authResult.error) return authResult.error;

    try {
        const { id } = await params;
        if (!id) return errorResponse("ID is required", 400);

        const body = await request.json();

        await connectDB();
        const updated = await Contact.findByIdAndUpdate(
            id,
            { isRead: Boolean(body.isRead) },
            { new: true }
        );

        if (!updated) {
            return errorResponse("Contact not found", 404);
        }

        return successResponse(updated, "Contact updated successfully");
    } catch (error) {
        console.error("Admin contacts PATCH error:", error);
        return errorResponse("Failed to update contact", 500);
    }
}

export async function DELETE(request, { params }) {
    const authResult = verifyAdmin(request);
    if (authResult.error) return authResult.error;

    try {
        const { id } = await params;
        if (!id) return errorResponse("ID is required", 400);

        await connectDB();
        const deleted = await Contact.findByIdAndDelete(id);

        if (!deleted) {
            return errorResponse("Contact not found", 404);
        }

        return successResponse({}, "Contact deleted successfully");
    } catch (error) {
        console.error("Admin contacts DELETE error:", error);
        return errorResponse("Failed to delete contact", 500);
    }
}
