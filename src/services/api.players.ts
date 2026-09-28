import type { PlayersListFilters } from "@/hooks/usePlayersListFilters"

const API_URL = import.meta.env.VITE_API_URL

export async function getPlayers(filters: PlayersListFilters = {
    search: "",
    position: "",
    page: 1
})  {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.position) params.set("position", filters.position);
    params.set("page", String(filters.page));


    const response = await fetch(`${API_URL}/players/?${params.toString()}`)
    if (!response.ok) throw new Error("Failed to fetch players.")
    return await response.json()
}

export async function getPlayer(id: string) {
    const response = await fetch(`${API_URL}/players/${id}/`)
    if (!response.ok) throw new Error("Failed to fetch player.")
    return await response.json()
}