const API_URL = import.meta.env.VITE_API_URL

export async function login(email:string, password:string) {

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