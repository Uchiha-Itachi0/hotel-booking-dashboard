import Papa from 'papaparse';

export interface HotelBooking {
    arrival_date_year: number;
    arrival_date_month: string;
    arrival_date_day_of_month: number;
    adults: number;
    children: number;
    babies: number;
    country: string;
}

const parseCSVData = (csvData: string): HotelBooking[] => {
    const parseResult = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim()
    });

    return parseResult.data.map((row: any) => ({
        arrival_date_year: parseInt(row.arrival_date_year),
        arrival_date_month: row.arrival_date_month,
        arrival_date_day_of_month: parseInt(row.arrival_date_day_of_month),
        adults: parseInt(row.adults),
        children: parseInt(row.children),
        babies: parseInt(row.babies),
        country: row.country
    }));
};

let bookingsCache: HotelBooking[] | null = null;

export const fetchHotelBookings = async (startDate: string, endDate: string): Promise<HotelBooking[]> => {
    try {
        if (bookingsCache) {
            return filterBookingsByDateRange(bookingsCache, startDate, endDate);
        }

        const response = await fetch('/hotel_bookings.csv');
        if (!response.ok) {
            throw new Error('Failed to fetch CSV file');
        }

        const csvText = await response.text();
        const bookings = parseCSVData(csvText);

        // Sort bookings by date
        bookingsCache = bookings.sort((a, b) => {
            const dateA = new Date(a.arrival_date_year, getMonthIndex(a.arrival_date_month), a.arrival_date_day_of_month);
            const dateB = new Date(b.arrival_date_year, getMonthIndex(b.arrival_date_month), b.arrival_date_day_of_month);
            return dateA.getTime() - dateB.getTime();
        });


        return filterBookingsByDateRange(bookingsCache, startDate, endDate);
    } catch (error) {
        console.error('Error fetching hotel bookings:', error);
        throw error;
    }
};

const getMonthIndex = (monthName: string): number => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
};

const filterBookingsByDateRange = (bookings: HotelBooking[], startDate: string, endDate: string): HotelBooking[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return bookings.filter(booking => {
        const bookingDate = new Date(
            booking.arrival_date_year,
            getMonthIndex(booking.arrival_date_month),
            booking.arrival_date_day_of_month
        );
        return bookingDate >= start && bookingDate <= end;
    });
};