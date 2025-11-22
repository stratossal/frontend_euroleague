import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import type {Player} from "@/schemas/players.ts";

interface AutoCompletePlayer {
    name: string;
    playerId: number;
}

interface PlayersAutocompleteProps {
    players: Player[];
    onPlayerSelect?: (player: AutoCompletePlayer | null) => void;
}

export default function PlayersAutocomplete({ players, onPlayerSelect }: PlayersAutocompleteProps) {
    const autoCompleteOptions: AutoCompletePlayer[] = players.map((player) => ({
        name: player.name,
        playerId: player.playerId
    }));



    const [selectedPlayer, setSelectedPlayer] = React.useState<AutoCompletePlayer | null>(null);

    return (
        <Stack spacing={2} sx={{ width: 400 }}>
            <Autocomplete
                options={autoCompleteOptions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.playerId === value.playerId}
                value={selectedPlayer}
                onChange={(_e, newValue) => {
                    setSelectedPlayer(newValue);
                    onPlayerSelect?.(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Search players..." variant="outlined" />
                )}
            />

        </Stack>
    );
}