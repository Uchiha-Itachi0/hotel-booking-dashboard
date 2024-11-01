import React, { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { VisitorChart } from './Chart/VisitorChart';
import { VisitorsByCountryChart } from './Chart/VisitorsByCountryChart';
import { SparklineChart } from './Chart/SparklineChart';
import { useHotelData } from '../hooks/useDataHooks';

const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState({
        start: '2024-01-01',
        end: '2024-12-31'
    });

    const { loading, error, filteredData, countryData, totals } = useHotelData(dateRange);

    const handleDateChange = (name: string, value: string) => {
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6">Error: {error.message}</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Hotel Bookings Dashboard</h1>
                <DateRangePicker
                    dateRange={dateRange}
                    onDateChange={handleDateChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VisitorChart data={filteredData} />
                <VisitorsByCountryChart data={countryData} />

                <SparklineChart
                    data={filteredData}
                    dataKey="adults"
                    total={totals.adults}
                    title="Adult Visitors"
                />

                <SparklineChart
                    data={filteredData}
                    dataKey="children"
                    total={totals.children}
                    title="Children Visitors"
                />
            </div>
        </div>
    );
};
export default Dashboard;
