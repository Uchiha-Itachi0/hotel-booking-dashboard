import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { ChartContainer } from './ChartContainer';

interface VisitorChartProps {
    data: any[];
}

export const VisitorChart: React.FC<VisitorChartProps> = ({ data }) => {
    const [zoomedData, setZoomedData] = useState(data);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleChartClick = (event: any) => {
        if (event && event.activeLabel) {
            const clickedDate = event.activeLabel;

            const zoomedRange = data.filter((item) => {
                const itemDate = new Date(item.date).getTime();
                const clickedDateTime = new Date(clickedDate).getTime();
                const range = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
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
        <ChartContainer title="Visitors per Day" className="col-span-2">
            <div className="relative h-80"> {/* Use relative positioning */}
                {isZoomed && (
                    <button
                        onClick={resetZoom}
                        className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded shadow-md z-10"
                    >
                        Reset Zoom
                    </button>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={zoomedData}
                        onClick={handleChartClick}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="totalVisitors"
                            stroke="#2563eb"
                            strokeWidth={2}
                            fill="url(#colorUv)"
                        />
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </ChartContainer>
    );
};
