import {useEffect, useState} from "react";
import type {Player} from "@/schemas/players.ts";
import {getPlayers} from "@/services/api.players.ts";
import {OrbitProgress} from "react-loading-indicators";
import {Pagination} from "@/components/ui/Pagination.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const PlayersListPage = () =>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const displayedPlayers = selectedPlayer ? [selectedPlayer] : players;

    useEffect(() => {
        getPlayers()
            .then(data => setPlayers(data))
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress color="#4F46E5" size="large" />
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl text-center font-bold text-gray-600 my-4 py-2 mt-10">
                Players
            </h1>
            <div className="absolute top-24 right-8 w-64 z-50">
                <Autocomplete
                    options={Array.from(new Map(players.map(p => [p.name, p])).values())}
                    getOptionLabel={(p) => p.name}
                    value={selectedPlayer}
                    onChange={(_e, newValue) => setSelectedPlayer(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search players..."
                            size={"small"}
                            variant="outlined"
                            className="w-full rounded-lg shadow-sm"
                        />
                    )}
                />
            </div>
            <Pagination players={displayedPlayers}
                        itemsPerPage={20}
            />
        </div>
    );
}

export default PlayersListPage;
