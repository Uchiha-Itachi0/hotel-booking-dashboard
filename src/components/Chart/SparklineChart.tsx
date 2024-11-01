// src/components/SparklineChart.tsx
import { LineChart, Line, ResponsiveContainer } from 'recharts';
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
                <LineChart data={data}>
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
