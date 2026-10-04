import jwt from "jsonwebtoken";
import { errorResponse } from "@/lib/responseHandler";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verify the JWT token from the Authorization header.
 * Returns the decoded payload if valid, or an error response if not.
 *
 * Usage in route handlers:
 *   const authResult = verifyAdmin(request);
 *   if (authResult.error) return authResult.error;
 *   // authResult.admin contains the decoded token payload
 */
export function verifyAdmin(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        error: errorResponse("Access denied. No token provided.", 401),
      };
    }

    const token = authHeader.split(" ")[1];

    if (!JWT_SECRET) {
      return {
        error: errorResponse("Server configuration error", 500),
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { admin: decoded };
  } catch (error) {
    return {
      error: errorResponse("Invalid or expired token", 401),
    };
  }
}
