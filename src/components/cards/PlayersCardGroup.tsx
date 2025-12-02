    import {CardStats} from "@/components/cards/CardStats.tsx";
    import type {Player} from "@/schemas/players.ts";

    type PlayerCardProps = {
        data:{
            key:string,
            label:string,
        }
        playerStats:Player
    }
     export const PlayersCardGroup = ({data,playerStats}:PlayerCardProps)=>{
        return (
            <>
                (
                <div className="space-y-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Player Analytics</h2>
                        <p className="text-gray-600">Advanced metrics beyond basic statistics</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {data.map((stat) => (
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
                                            .map((player,index) => (
                                                <CardStats name={player.name} id={player._id} index={index} keyA={stat.key} team={player.team} stats={player.stats}/>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )
            </>
        )
    }