import { useEffect, useState } from 'react';
import { getPlayers } from "@/services/api.players.ts";
import { getTeams } from "@/services/api.teams.ts";
import { OrbitProgress } from "react-loading-indicators";

const StatsPage = () => {
    const [activeCategory, setActiveCategory] = useState('players');
    const [playerStats, setPlayerStats] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
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

    const advancedPlayerStats = [
        { key: "pointsPerGame", label: "Points Per Game" },
        { key: "assistsPerGame", label: "Assists Per Game" },
        { key: "reboundsPerGame", label: "Rebounds Per Game" },
        { key: "stealsPerGame", label: "Steals Per Game" },
        { key: "blocksPerGame", label: "Blocks Per Game" },
        { key: "fieldGoalPercentage", label: "Field Goal %" },
        { key: "threePointPercentage", label: "3PT %" },
        { key: "freeThrowPercentage", label: "FT %" },
        { key: "efficiency", label: "Efficiency" },
        { key: "minutesPerGame", label: "Minutes Per Game" }
    ];

    const advancedTeamStats = [
        { key: "pointsPerGame", label: "Points Per Game" },
        { key: "reboundsPerGame", label: "Rebounds Per Game" },
        { key: "assistsPerGame", label: "Assists Per Game" },
        { key: "fieldGoalPercentage", label: "Field Goal %" },
        { key: "threePointPercentage", label: "3PT %" },
        { key: "freeThrowPercentage", label: "FT %" },
        { key: "defensiveRating", label: "Defensive Rating" },
        { key: "offensiveRating", label: "Offensive Rating" }
    ];

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced EuroLeague Analytics</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Deep dive into advanced metrics and performance analysis
                    </p>
                </div>

                {/* Main Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                    activeCategory === category.id
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <span className="mr-2 text-lg">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Player Stats */}
                {activeCategory === 'players' && (
                    <div className="space-y-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Player Analytics</h2>
                            <p className="text-gray-600">Advanced metrics beyond basic statistics</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {advancedPlayerStats.map((stat) => (
                                <div key={stat.key} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-white">{stat.label}</h3>
                                            <span className="text-2xl">📊</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {playerStats
                                                .sort((a, b) => (b.stats[stat.key] || 0) - (a.stats[stat.key] || 0))
                                                .slice(0, 5)
                                                .map((player, index) => (
                                                    <div key={player._id || player.playerId || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{player.name}</div>
                                                                <div className="text-sm text-gray-500">{player.team}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-purple-600">
                                                                {stat.key.includes('Percentage')
                                                                    ? `${((player.stats[stat.key] || 0) * 100).toFixed(1)}%`
                                                                    : (player.stats[stat.key] || 0).toFixed(1)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Stats */}
                {activeCategory === 'teams' && (
                    <div className="space-y-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Team Analytics</h2>
                            <p className="text-gray-600">Team performance metrics and efficiency ratings</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {advancedTeamStats.map((stat) => (
                                <div key={stat.key} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-white">{stat.label}</h3>
                                            <span className="text-2xl">🏀</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {teamStats
                                                .sort((a, b) => (b.teamStats[stat.key] || 0) - (a.teamStats[stat.key] || 0))
                                                .slice(0, 5)
                                                .map((team, index) => (
                                                    <div key={team._id || team.teamId || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{team.name}</div>
                                                                <div className="text-sm text-gray-500">{team.city}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-green-600">
                                                                {stat.key.includes('Percentage')
                                                                    ? `${((team.teamStats[stat.key] || 0) * 100).toFixed(1)}%`
                                                                    : (team.teamStats[stat.key] || 0).toFixed(1)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default StatsPage;
