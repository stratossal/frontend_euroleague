import type {User} from "@/schemas/users.ts";


const API_URL = import.meta.env.VITE_API_URL

export async function getUsers() :Promise<User[]> {
    const response = await fetch(`${API_URL}/users/`, {
        method: "GET",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
    if (!response.ok) throw new Error("Failed to fetch users.")
    return await response.json()
}

export async function getUser(id: string, token: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!response.ok) throw new Error("Failed to fetch user.")
    return await response.json()
}

export async function createUser(data: Omit<User,"id">) {
    const response = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error("Failed to create user.")
    return await response.json()
}

export async function updateUser(id: string, data: Partial<User>):Promise<User>{
    const response = await fetch(`${API_URL}/users/${id}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error("Failed to update user.")
    return await response.json()
}

export async function deleteUser(id: string) {
    const response = await fetch(`${API_URL}/users/${id}/`, {
        method: "DELETE"
    })
    if (!response.ok) throw new Error("Failed to delete user.")
    return await response.json()
}