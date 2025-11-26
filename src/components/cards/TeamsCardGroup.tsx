import {CardStats} from "@/components/cards/CardStats.tsx";
type TeamCardGroupProps = {
    data:{
        key: string,
        label: string,
    }[],
    teamStats:any
}

 export const TeamsCardGroup = ({data,teamStats}:TeamCardGroupProps) => {
    return (
        <>
            <div className="space-y-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Team Analytics</h2>
                    <p className="text-gray-600">Team performance metrics and efficiency ratings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {data.map((stat) => (
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
                                            <CardStats name={team.name} id={team._id} stats={team.teamStats} index={index} team={team.name} keyA={stat.key}/>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}