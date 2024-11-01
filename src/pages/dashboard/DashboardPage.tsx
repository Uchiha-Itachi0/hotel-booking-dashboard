import React, { useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { DateRangePicker } from "../../components/DateRangePicker";
import { VisitorChart } from "../../components/Chart/VisitorChart";
import { VisitorsByCountryChart } from "../../components/Chart/VisitorsByCountryChart";
import { SparklineChart } from "../../components/Chart/SparklineChart";
import { useHotelData } from "../../hooks/useDataHooks";

const DashboardPage: React.FC = () => {
    const [dateRange, setDateRange] = useState({
        start: '2015-07-01',
        end: '2024-08-30'
    });

    const { loading, error, filteredData, countryData, totals } = useHotelData(dateRange);

    const handleDateChange = (name: string, value: string) => {
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                {/* Tailwind spinner */}
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg">Loading...</p>
            </div>
        </div>
    );

    if (error) return <div className="p-6">Error: {error.message}</div>;

    return (
        <PageLayout title="Dashboard">
            <div className="p-6 max-w-7xl mx-auto overflow-y-scroll custom-scrollbar h-[80vh] bg-white rounded-2xl shadow-2xl">
                <div className="sticky top-0 right-0 z-10 flex justify-end mb-6">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <DateRangePicker
                            dateRange={dateRange}
                            onDateChange={handleDateChange}
                        />
                    </div>
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
        </PageLayout>
    );
};

export default DashboardPage;
