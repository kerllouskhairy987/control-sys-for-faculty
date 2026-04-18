"use server";

import { LoginSchema } from "@/validation/auth/Login";

interface loginError {
    email?: string | null;
    password?: string | null;
}

export interface loginStates {
    success: boolean;
    message: string;
    formData: FormData;
    error: loginError | null;
}

export async function loginAction(
    prevData: unknown,
    formData: FormData,
): Promise<loginStates> {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const rawData = {
        email,
        password,
    };
    // Simulate an API call or validation logic here
    // make validation using ZOD
    const result = LoginSchema.safeParse(rawData);
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return {
            success: false,
            message: "Login failed",
            formData,
            error: errors as loginError,
        };
    }

    // integrate with DB
    try {
        const data = await fetch(`${process.env.DOMAIN}/api/accounts/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawData),
        });
        const response = await data.json();

        if (!data.ok) {
            return {
                success: false,
                message: response.name || "Invalid email or password",
                formData,
                error: null,
            };
        }

        return {
            success: true,
            message: "Login successful",
            formData: new FormData(), // Clear form data on success
            error: null,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "internal server error",
            formData,
            error: null,
        }
    }
}
