import type { Player } from "@/schemas/players"
import { getPlayer, getPlayers } from "@/services/api.players"
import { useQuery } from "@tanstack/react-query"
import type { PlayersListFilters } from "./usePlayersListFilters"


export const usePlayers = (filters: PlayersListFilters) => {
  return useQuery<Player[]>({
    queryKey: ["players",filters],
    queryFn: () => getPlayers(filters),
    select: (data) => [...data].sort((a,b) => a.team.localeCompare(b.team))
  })
}

export const usePlayer = (id? : string) => {
  return useQuery<Player>({
    queryKey: ["player", id],
    queryFn: () => getPlayer(id!),
    enabled: !!id
  })
}