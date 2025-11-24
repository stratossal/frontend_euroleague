import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Player} from "@/schemas/players.ts";
import {getPlayer} from "@/services/api.players.ts";
import {OrbitProgress} from "react-loading-indicators";
import PieChart from "@/components/charts/PieChart.tsx";


const PlayerPage = () =>{
    const {playerId} = useParams<{ playerId: string}>();
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState<Player | undefined>();

    useEffect(() => {
        if (!playerId) return;
        getPlayer(playerId)
            .then(data => setPlayer(data))
            .finally(() => setLoading(false));
    }, [playerId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress
                    color="#4F46E5"
                    size="large"
                />
            </div>
        )
    }

    if (!player) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Player not found</p>
            </div>
        )
    }

    const {name, stats, team} = player;

    const shootingData = [
        { value: stats.fieldGoalPercentage, name: 'FG%' },
        { value: stats.threePointPercentage, name: '3P%' },
        { value: stats.freeThrowPercentage, name: 'FT%' },
        { value: stats.pointsPerGame, name: 'PPG' },
    ];

    const performanceRadar = [
        { name: 'Points', value: stats.pointsPerGame },
        { name: 'Rebounds', value: stats.reboundsPerGame },
        { name: 'Assists', value: stats.assistsPerGame },
        { name: 'Steals', value: stats.stealsPerGame },
        { name: 'Blocks', value: stats.blocksPerGame },
        { name: 'EFF', value: stats.efficiency },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
            {/* Player Header */}
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2 border-l-4 border-indigo-600">
                <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                <p className="text-gray-600 text-lg">{team}</p>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shooting Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Shooting Breakdown</h2>
                    <PieChart
                        data={shootingData}
                        title="Shooting Statistics"
                        subtext="Field goal percentages"
                        height={350}
                    />
                </div>

                {/* Radar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
                    <PieChart
                        data={performanceRadar}
                        title="Performance Radar"
                        height={350}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">PPG</p>
                    <p className="text-2xl font-bold">{stats.pointsPerGame}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">RPG</p>
                    <p className="text-2xl font-bold">{stats.reboundsPerGame}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">APG</p>
                    <p className="text-2xl font-bold">{stats.assistsPerGame}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">SPG</p>
                    <p className="text-2xl font-bold">{stats.stealsPerGame}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">BPG</p>
                    <p className="text-2xl font-bold">{stats.blocksPerGame}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-gray-500">EFF</p>
                    <p className="text-2xl font-bold">{stats.efficiency}</p>
                </div>
            </div>
        </div>
    );
}

export default PlayerPage;