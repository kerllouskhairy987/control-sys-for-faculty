import * as z from "zod";

/**
 * @desc     Validation schema for user login
 * @details   Validates that the email is in a proper format and the password meets complexity requirements
 * @returns   A Zod schema object for validating login form data
*/
export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        ),
});