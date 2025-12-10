import type {LoginFields} from "@/schemas/login.ts";

const API_URL = import.meta.env.VITE_API_URL

export type LoginResponse = {
    token: string,
    user: {
        _id: string,
        firstname: string,
        lastname: string,
        email: string,
        country: string,
        phone?: string,
        favTeam?: string,
        address?: {
            area: string,
            street: string,
            number: string,
            po: string,
            municipality: string
        }
    }
}


export async function login({email,password}:LoginFields):Promise<LoginResponse> {

    const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
        let detail = "Login Failed."
        try {
            const data = await res.json()
            if (typeof data?.detail === "string") detail = data.detail
        }catch (e) {
            console.log(e)
        }
        throw new Error(detail)
    }
    return await res.json()
}