import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import React from "react";

interface VisitorChartProps {
    data: any[];
}

export const VisitorChart: React.FC<VisitorChartProps> = ({ data }) => (
    <ChartContainer title="Visitors per Day" className="col-span-2">
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="totalVisitors"
                        stroke="#2563eb"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </ChartContainer>
);