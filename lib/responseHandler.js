import { NextResponse } from "next/server";

/**
 * Return a standardized success JSON response.
 */
export function successResponse(data = null, message = "Success", status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * Return a standardized error JSON response.
 */
export function errorResponse(message = "Something went wrong", status = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
