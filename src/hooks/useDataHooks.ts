// src/hooks/useHotelData.ts

import { useState, useEffect, useMemo } from 'react';
import { fetchHotelBookings, HotelBooking } from '../services/apiService';
import { formatDate, isDateInRange } from '../utils/dateUtils';

interface DateRange {
    start: string;
    end: string;
}

interface UseHotelDataReturn {
    loading: boolean;
    error: Error | null;
    filteredData: any[];
    countryData: any[];
    totals: {
        adults: number;
        children: number;
    };
}

export const useHotelData = (dateRange: DateRange): UseHotelDataReturn => {
    const [data, setData] = useState<HotelBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const bookings = await fetchHotelBookings(dateRange.start, dateRange.end);
                setData(bookings);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [dateRange.start, dateRange.end]);

    const filteredData = useMemo(() => {
        return data
            .map(booking => ({
                ...booking,
                date: formatDate(
                    booking.arrival_date_year,
                    booking.arrival_date_month,
                    booking.arrival_date_day_of_month
                ),
                totalVisitors: booking.adults + booking.children + booking.babies
            }))
            .filter(booking => isDateInRange(booking.date, dateRange.start, dateRange.end));
    }, [data, dateRange]);

    const countryData = useMemo(() => {
        const countryTotals: Record<string, number> = {};
        filteredData.forEach(booking => {
            countryTotals[booking.country] = (countryTotals[booking.country] || 0) + booking.totalVisitors;
        });
        return Object.entries(countryTotals).map(([country, visitors]) => ({
            country,
            visitors
        }));
    }, [filteredData]);

    const totals = useMemo(() => ({
        adults: filteredData.reduce((sum, booking) => sum + booking.adults, 0),
        children: filteredData.reduce((sum, booking) => sum + booking.children, 0)
    }), [filteredData]);

    return { loading, error, filteredData, countryData, totals };
};