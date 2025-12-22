import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Player} from "@/schemas/players.ts";
import {getPlayer} from "@/services/api.players.ts";
import {OrbitProgress} from "react-loading-indicators";
import PieChart from "@/components/charts/PieChart.tsx";
import TiltedCard from "@/components/ui/TiltedCard.tsx";

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

    if (!player) return null
    const teamObj = player.team as unknown as { _id: string; name: string; logo: string };

    const {name, stats,} = player;    //
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
        <>
            <div className="min-h-screen bg-gray-50 pt-15">
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-6xl mx-auto px-4 py-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {name.split(' ').map(n => n[0]).join('')}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        {name}
                                    </h1>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                    #{player.jerseyNumber}
                                </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Position:</span>
                                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                                        {player.position}
                                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Nationality:</span>
                                        <span>{player.nationality}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Team:</span>
                                            <div className="flex items-center gap-2">
                                                <TiltedCard
                                                    imageSrc={teamObj.logo}
                                                    altText={`${teamObj.name} Logo`}
                                                    containerHeight="40px"
                                                    containerWidth="40px"
                                                    imageHeight="40px"
                                                    imageWidth="40px"
                                                    rotateAmplitude={30}
                                                    scaleOnHover={1.1}
                                                    showMobileWarning={false}
                                                    showTooltip={false}
                                                    displayOverlayContent={true}
                                                />

                                                <Link
                                                    to={`/teams/${teamObj._id}`}
                                                    className="text-blue-600 font-semibold hover:underline"
                                                >
                                                    {teamObj.name}
                                                </Link>

                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-blue-600">{stats.pointsPerGame}</div>
                            <div className="text-gray-600 text-sm">PPG</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-green-600">{stats.reboundsPerGame}</div>
                            <div className="text-gray-600 text-sm">RPG</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-purple-600">{stats.assistsPerGame}</div>
                            <div className="text-gray-600 text-sm">APG</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-orange-600">{stats.efficiency}</div>
                            <div className="text-gray-600 text-sm">EFF</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-red-600">{stats.fieldGoalPercentage}%</div>
                            <div className="text-gray-600 text-sm">FG%</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <div className="text-xl font-bold text-indigo-600">{stats.threePointPercentage}%</div>
                            <div className="text-gray-600 text-sm">3P%</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <PieChart
                                data={shootingData}
                                title="Shooting Statistics"
                                subtext="Field goal percentages and scoring"
                                height={350}
                            />
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <PieChart
                                data={performanceRadar}
                                title="Performance Metrics"
                                subtext="Key performance indicators"
                                height={350}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PlayerPage;