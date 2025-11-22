import type {EChartsOption} from "echarts";
import type {PieChartProps} from "@/components/charts/PieChart.tsx";


export const getPieDataTransformer = (props: PieChartProps) => {
    const {data, title, subtext} = props;
    const option: EChartsOption = {
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
                    formatter: '{c} ({d}%)'
                }
            }
        ]
    };
    return option;
}