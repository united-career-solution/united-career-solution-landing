/**
 * Validate contact form input fields.
 * Returns an object with `isValid` boolean and `errors` array.
 */
export function validateContactInput({ firstName, lastName, email, role, company, linkedin, message }) {
  // As per user request, we accept whatever is sent without returning formatting errors.
  return {
    isValid: true,
    errors: [],
  };
}
