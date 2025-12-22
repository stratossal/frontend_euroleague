type CardStatsProps<T> = {
    name: string;
    id: string;
    stats: T;
    index: number;
    team: string;
    keyA: keyof T;
}

export const CardStats = <T extends {}>({ name, id, stats, index, team, keyA }: CardStatsProps<T>) => {
    return (
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
                    {keyA.toString().includes('Percentage')
                        ? `${(stats[keyA] as number || 0).toFixed(1)}%`
                        : ((stats[keyA] as number) || 0).toFixed(1)
                    }
                </div>
            </div>
        </div>
    );
}
