import {OrbitProgress} from "react-loading-indicators";
import {Pagination} from "@/components/ui/Pagination.tsx";
import TextField from "@mui/material/TextField";
import { usePlayers } from "@/hooks/usePlayers";
import { usePlayersListFilters } from "@/hooks/usePlayersListFilters";
import { useEffect, useState } from "react";


const PlayersListPage = () =>{

    const {search, position, page, setFilters} = usePlayersListFilters()
    const {data: players,isPending,isError} = usePlayers({search,position,page})
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
      setSearchInput(search);
    }, [search]);

   useEffect(() => {
  const timeoutId = setTimeout(() => {
    setFilters({
      search: searchInput,
      page: 1,
    });
  }, 900);

  return () => clearTimeout(timeoutId);
}, [searchInput, setFilters]);
    

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress color="#4F46E5" size="large" />
            </div>
        )
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center h-screen">
          There are no data
        </div>
      );
    }

    if (!players) {
      return (
        <div className="flex items-center justify-center h-screen">
          No players found
        </div>
      );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl text-center font-bold text-gray-600 my-4 py-2 mt-10">
                Players
            </h1>
            <div className="absolute top-24 right-8 w-64 z-50">
                        <TextField
                            label="Search players..."
                            size={"small"}
                            value={searchInput}
                            variant="outlined"
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full rounded-lg shadow-sm"
                        />
            </div>
            <Pagination players={players}
                        itemsPerPage={20}
            />
        </div>
    );
}

export default PlayersListPage;
