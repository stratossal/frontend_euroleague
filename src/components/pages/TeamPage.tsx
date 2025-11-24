import TiltedCard from "@/components/ui/TiltedCard"
import { getTeam } from "@/services/api.teams.ts";
import type { Team } from "@/schemas/teams.ts";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import {useNavigate, useParams} from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PieChart from "@/components/charts/PieChart.tsx";

const TeamPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const [team, setTeam] = useState<Team | undefined>();
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (!teamId) return
        getTeam(teamId)
            .then((data) => setTeam(data))
            .finally(() => setLoading(false))
    }, [teamId])

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

    if (!team) return null

    const {teamStats, standings, name} = team
    const teamStatsData = [
        { value: teamStats.pointsPerGame, name: 'Points' },
        { value: teamStats.reboundsPerGame, name: 'Rebounds' },
        { value: teamStats.assistsPerGame, name: 'Assists' },
        { value: teamStats.fieldGoalPercentage, name: 'FG%' },
        { value: teamStats.threePointPercentage, name: '3P%' },
    ]

    const standingsData = [
        { value: standings.wins, name: 'Wins' },
        { value: standings.losses, name: 'Losses' },
    ]

    return (<>
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <TiltedCard
                            imageSrc={team.logo}
                            altText={`${team.name} Logo`}
                            containerHeight="100px"
                            containerWidth="100px"
                            imageHeight="100px"
                            imageWidth="100px"
                            rotateAmplitude={30}
                            scaleOnHover={1.1}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent={true}
                        />
                        <div>
                            <h1 className="text-3xl font-bold uppercase text-gray-800">
                                {name}
                            </h1>
                            <p className="text-gray-600 text-sm">{team.city}, {team.country}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <div className="text-lg font-bold text-blue-600">{standings.wins}-{standings.losses}</div>
                        <div className="text-gray-600 text-sm">Record</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <div className="text-lg font-bold text-green-600">#{standings.position}</div>
                        <div className="text-gray-600 text-sm">Position</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <div className="text-lg font-bold text-purple-600">+{standings.pointDifference}</div>
                        <div className="text-gray-600 text-sm">Point Diff</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <div className="text-lg font-bold text-orange-600">{teamStats.pointsPerGame}</div>
                        <div className="text-gray-600 text-sm">PPG</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <PieChart
                            data={teamStatsData}
                            title="Team Statistics"
                            subtext="Key performance metrics"
                            height={350}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <PieChart
                            data={standingsData}
                            title="Season Record"
                            subtext="Wins vs Losses"
                            height={350}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Roster</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {team.players?.length || 0} players • Coach: {team.coach}
                        </p>
                    </div>
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[200px]">Player</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Nationality</TableHead>
                                <TableHead className="text-right">PPG</TableHead>
                                <TableHead className="text-right">EFF</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {team.players?.map((player) => (
                                <TableRow key={player._id}
                                          className="hover:bg-gray-50 cursor-pointer"
                                          onClick={()=> navigate(`/players/${player._id}`)}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm">
                                                {player.jerseyNumber}
                                            </div>
                                            <span>{player.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                                        {player.position}
                                    </span>
                                    </TableCell>
                                    <TableCell>{player.nationality}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {player.stats.pointsPerGame}
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-green-600">
                                        {player.stats.efficiency}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>


        </>
    )
}

export default TeamPage;