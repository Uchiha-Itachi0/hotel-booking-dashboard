import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from './ChartContainer';
import React from "react";

interface SparklineChartProps {
    data: any[];
    dataKey: string;
    total: number;
    title: string;
}

export const SparklineChart: React.FC<SparklineChartProps> = ({
                                                                  data,
                                                                  dataKey,
                                                                  total,
                                                                  title
                                                              }) => (
    <ChartContainer title={title}>
        <div className="text-3xl font-bold mb-4">{total}</div>
        <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd' }}
                        labelStyle={{ fontWeight: 'bold' }}
                        formatter={(value) => [`${value}`, `Visitors`]}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </ChartContainer>
);
