import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import React from "react";

interface VisitorsByCountryChartProps {
    data: any[];
}

export const VisitorsByCountryChart: React.FC<VisitorsByCountryChartProps> = ({ data }) => (
    <ChartContainer title="Visitors per Country" className="col-span-2">
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="visitors"
                        fill="#2563eb"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </ChartContainer>
);
