type Stats={
    gamesPlayed: number,
    pointsPerGame: number,
    reboundsPerGame: number,
    assistsPerGame: number,
    stealsPerGame: number,
    blocksPerGame: number,
    fieldGoalPercentage: number,
    threePointPercentage: number,
    freeThrowPercentage: number,
    efficiency: number,
    minutesPerGame: number
}

type CardStatsProps = {
    name: string,
    id: string,
    stats: Stats,
    index: number,
    team: string,
    keyA: string,
}
 export const CardStats = (props: CardStatsProps) => {
     const {name,id,stats,index,team,keyA} = props;
    return (
        <>
            <div key={id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-bold">
                        {index + 1}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{name}</div>
                        <div className="text-sm text-gray-500">{team}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                        {keyA.includes('Percentage')
                            ? `${(stats[keyA] || 0).toFixed(1)}%`
                            : (stats[keyA] || 0).toFixed(1)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
