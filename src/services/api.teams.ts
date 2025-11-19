const API_URL = import.meta.env.VITE_API_URL

export async function getTeams() {
    const response = await fetch(`${API_URL}/teams/`,{
        mode: 'cors'
    })
    if (!response.ok) throw new Error("Failed to fetch teams.")
    return await response.json()
}

export async function getTeam(id: string) {
    const response = await fetch(`${API_URL}/teams/${id}/`)
    if (!response.ok) throw new Error("Failed to fetch team.")
    return await response.json()
}




