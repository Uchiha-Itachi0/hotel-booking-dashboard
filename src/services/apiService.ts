import Papa from 'papaparse';

/**
 * Interface representing a hotel booking record.
 */
export interface HotelBooking {
    arrival_date_year: number;
    arrival_date_month: string;
    arrival_date_day_of_month: number;
    adults: number;
    children: number;
    babies: number;
    country: string;
}

/**
 * Parses CSV data into an array of HotelBooking objects.
 * @param csvData - The raw CSV data as a string.
 * @returns An array of HotelBooking objects.
 */
const parseCSVData = (csvData: string): HotelBooking[] => {
    const parseResult = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim()
    });

    // Transform parsed data into HotelBooking objects
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

// Cache to store parsed bookings data to avoid re-fetching.
let bookingsCache: HotelBooking[] | null = null;

/**
 * Fetches hotel bookings from a CSV file and filters them by a given date range.
 * @param startDate - The start date of the filter range in 'YYYY-MM-DD' format.
 * @param endDate - The end date of the filter range in 'YYYY-MM-DD' format.
 * @returns A promise resolving to an array of filtered HotelBooking objects.
 */
export const fetchHotelBookings = async (startDate: string, endDate: string): Promise<HotelBooking[]> => {
    try {
        // Return cached data if available
        if (bookingsCache) {
            return filterBookingsByDateRange(bookingsCache, startDate, endDate);
        }

        // Fetch CSV data from the server
        const response = await fetch('/hotel_bookings.csv');
        if (!response.ok) {
            throw new Error('Failed to fetch CSV file');
        }

        const csvText = await response.text();
        const bookings = parseCSVData(csvText);

        // Sort bookings by date for consistency
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

/**
 * Returns the zero-based index of a month from its name.
 * @param monthName - The full name of the month (e.g., 'January').
 * @returns The index of the month (0 for January, 11 for December).
 */
const getMonthIndex = (monthName: string): number => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
};

/**
 * Filters an array of hotel bookings by a given date range.
 * @param bookings - The array of HotelBooking objects to filter.
 * @param startDate - The start date of the filter range in 'YYYY-MM-DD' format.
 * @param endDate - The end date of the filter range in 'YYYY-MM-DD' format.
 * @returns An array of HotelBooking objects within the date range.
 */
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
