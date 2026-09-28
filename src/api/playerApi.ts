import type { PlayersListFilters } from "@/hooks/usePlayersListFilters";
import axiosInstance from "@/lib/axios.ts";
import type {Player} from "@/schemas/players.ts";

export async function getPlayers(
    filters: PlayersListFilters){
    const res = await axiosInstance.get("/players",{
        params: filters
    })
    return res.data;
}

export async function getPlayerById(id: string): Promise<Player> {
    const res = await axiosInstance.get(`/players/${id}`);
    return res.data;
}