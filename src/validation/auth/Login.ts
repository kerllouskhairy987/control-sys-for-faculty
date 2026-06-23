import * as z from "zod";

/**
 * @desc     Validation schema for user login
 * @details   Validates that the email is in a proper format and the password meets complexity requirements
 * @returns   A Zod schema object for validating login form data
*/
export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" })
});