"use server";

import getTokenFromCookie from "@/utils/getCookie";

/**
 * @desc     get All programs
 * @access   admin
*/
export async function getAllPrograms() {
    try {
        // get token form cookies
        const token = await getTokenFromCookie();

        const res = await fetch(`${process.env.ENDPOINTS_URL}/api/departments/programs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            next: { tags: ['programs'] }
        })

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
        return { message: "Internal Server Error" }
    }
}
