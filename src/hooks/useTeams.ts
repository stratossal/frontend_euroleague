import {useQuery} from "@tanstack/react-query";
import {getTeams} from "@/api/teamApi.ts";
import type {Team} from "@/schemas/teams.ts";

export function useTeams() {
    return useQuery<Team[]>({
        queryKey:["teams"],
        queryFn: getTeams,
        select:(data)=>[...data].sort(
            (a,b)=>a.standings.position - b.standings.position
        )
    })
}