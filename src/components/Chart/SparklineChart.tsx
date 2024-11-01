import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from './ChartContainer';
import React, { useState } from "react";

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
                                                              }) => {
    const [zoomedData, setZoomedData] = useState(data);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleChartClick = (event: any) => {
        if (event && event.activeLabel) {
            const clickedDate = event.activeLabel;

            const zoomedRange = data.filter((item) => {
                const itemDate = new Date(item.date).getTime();
                const clickedDateTime = new Date(clickedDate).getTime();
                const range = 5 * 24 * 60 * 60 * 1000;
                return (
                    itemDate >= clickedDateTime - range &&
                    itemDate <= clickedDateTime + range
                );
            });

            setZoomedData(zoomedRange);
            setIsZoomed(true);
        }
    };

    const resetZoom = () => {
        setZoomedData(data);
        setIsZoomed(false);
    };

    return (
        <ChartContainer title={title}>
            <div className="text-3xl font-bold mb-4">{total}</div>
            <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={zoomedData} onClick={handleChartClick}>
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
                            stroke="#2563eb"
                            fill="rgba(37, 99, 235, 0.3)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {isZoomed && (
                <div className="mt-2">
                    <button
                        onClick={resetZoom}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
                    >
                        Reset Zoom
                    </button>
                </div>
            )}
        </ChartContainer>
    );
};
