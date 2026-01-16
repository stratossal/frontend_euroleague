import { useEffect, useState } from 'react';
import { getPlayers } from "@/services/api.players.ts";
import { getTeams } from "@/services/api.teams.ts";
import { OrbitProgress } from "react-loading-indicators";
import type {Player} from "@/schemas/players.ts";
import {Tab} from "@/components/tablist/Tab.tsx";
import {TeamsCardGroup} from "@/components/cards/TeamsCardGroup.tsx";
import {PlayersCardGroup} from "@/components/cards/PlayersCardGroup.tsx";
import  type {Team} from "@/schemas/teams.ts"


const StatsPage = () => {
    const [activeCategory, setActiveCategory] = useState('players');
    const [playerStats, setPlayerStats] = useState<Player[]>([]);
    const [teamStats, setTeamStats] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPlayers(), getTeams()])
            .then(([players, teams]) => {
                setPlayerStats(players);
                setTeamStats(teams);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress color="#4F46E5" size="large" />
            </div>
        )
    }

    const categories = [
        { id: 'players', name: 'Player Stats', icon: '👤' },
        { id: 'teams', name: 'Team Stats', icon: '🏀' },
    ];

    const advancedPlayerStats: { key: keyof Player["stats"]; label: string }[] = [
        { key: "pointsPerGame", label: "Points Per Game" },
        { key: "assistsPerGame", label: "Assists Per Game" },
        { key: "reboundsPerGame", label: "Rebounds Per Game" },
        { key: "stealsPerGame", label: "Steals Per Game" },
        { key: "blocksPerGame", label: "Blocks Per Game" },
        { key: "fieldGoalPercentage", label: "Field Goal %" },
        { key: "threePointPercentage", label: "3PT %" },
        { key: "freeThrowPercentage", label: "FT %" },
        { key: "efficiency", label: "Efficiency" },
        { key: "minutesPerGame", label: "Minutes Per Game" },
    ];

    const advancedTeamStats: { key: keyof Team["teamStats"]; label: string }[] = [
        { key: "pointsPerGame", label: "Points Per Game" },
        { key: "reboundsPerGame", label: "Rebounds Per Game" },
        { key: "assistsPerGame", label: "Assists Per Game" },
        { key: "fieldGoalPercentage", label: "Field Goal %" },
        { key: "threePointPercentage", label: "3PT %" },
        { key: "freeThrowPercentage", label: "FT %" },
        { key: "defensiveRating", label: "Defensive Rating" },
        { key: "offensiveRating", label: "Offensive Rating" },
    ];


    return (
        <>
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced EuroLeague Analytics</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Deep dive into advanced metrics and performance analysis
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
                        {categories?.map((category) =>
                            <Tab id={category.id} key={category.id} icon={category.icon} handleClick={()=> setActiveCategory(category.id) }
                            activeTab={activeCategory} name={category.name} />
                        )}
                    </div>
                </div>

                {activeCategory === 'players' && <PlayersCardGroup data={advancedPlayerStats} playerStats={playerStats}/> }

                {activeCategory === 'teams' && <TeamsCardGroup data={advancedTeamStats} teamStats={teamStats}/>}
            </div>
        </div>
        </>
    )
}

export default StatsPage;
