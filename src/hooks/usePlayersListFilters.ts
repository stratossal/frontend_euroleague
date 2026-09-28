import { useCallback } from "react"
import { useSearchParams } from "react-router"

export type PlayersListFilters= {
  search: string
  position: string
  page: number
}

export const usePlayersListFilters = () => {
  const [searchParams,setSearchParams] = useSearchParams()

const search = searchParams.get("search") ?? ""
const position = searchParams.get("position") ?? ""
const page = Number(searchParams.get("page") ?? 1)

const setFilters = useCallback((filters: Partial<PlayersListFilters>) => {
  setSearchParams((param) => {
      if (filters.search !== undefined) {
    filters.search ? param.set("search", filters.search) : param.delete("search");  
  }
  if (filters.position !== undefined) {
  filters.position
    ? param.set("position", filters.position)
    : param.delete("position");
}
    param.set("page", String(filters.page ?? 1));

    return param
  })
  
},[setSearchParams])
return {
    search,
    position,
    page,
    setFilters
  }
}

