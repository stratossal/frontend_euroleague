const API_URL = import.meta.env.VITE_API_URL

export async function getPlayers()  {
    const response = await fetch(`${API_URL}/players`)
    if (!response.ok) throw new Error("Failed to fetch players.")
    return await response.json()
}

export async function getPlayer(id: string) {
    const response = await fetch(`${API_URL}/players/${id}`)
    if (!response.ok) throw new Error("Failed to fetch player.")
    return await response.json()
}