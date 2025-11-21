import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartProps {
    data: { value: number; name: string }[];
    title?: string;
    subtext?: string;
    height?: number;
    width?: number;
}

const PieChart: React.FC<PieChartProps> = ({
                                               data,
                                               title = 'Team Distribution',
                                               subtext = 'Euroleague Teams',
                                               height = 400,
                                               width = 600
                                           }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current, );

        const option: echarts.EChartsOption = {
            title: {
                text: title,
                subtext: subtext,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
                confine: true,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#333',
                    fontSize: 12
                },
                padding: [6, 10],
                extraCssText: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                type: 'scroll'
            },
            series: [
                {
                    name: 'Teams',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        formatter: '{b}: {c} ({d}%)'
                    }
                }
            ]
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [data, title, subtext]);

    return (
        <div
            ref={chartRef}
            style={{
                height: `${height}px`,
                width: `${width}px`
            }}
        />
    );
};

export default PieChart;



