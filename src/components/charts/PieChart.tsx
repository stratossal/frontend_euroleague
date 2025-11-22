import React, {useRef} from 'react';
import EChartsReact from "echarts-for-react";
import {getPieDataTransformer} from "@/components/charts/pieData-transformers.ts";

export interface PieChartProps {
    data: { value: number; name: string }[];
    title?: string;
    subtext?: string;
    height?: number;
    width?: number;
}

const PieChart: React.FC<PieChartProps> = (props) => {
    const chartRef = useRef(null);
    const {height, width} = props;

       const pieOption = getPieDataTransformer(props);


    return (
        <EChartsReact
            option={pieOption}
            ref={chartRef}
            style={{
                height: `${height}px`,
                width: `${width}px`
            }}
        />
    );
};

export default PieChart;



