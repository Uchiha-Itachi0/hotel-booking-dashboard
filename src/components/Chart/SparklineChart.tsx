// src/components/SparklineChart.tsx
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from './ChartContainer';

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
                <AreaChart data={data}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd' }}
                        labelStyle={{ fontWeight: 'bold' }}
                        formatter={(value) => [`${value}`, `Visitors`]}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke="#2563eb" // Dark blue outline
                        fill="rgba(37, 99, 235, 0.3)" // Light blue fill
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </ChartContainer>
);
