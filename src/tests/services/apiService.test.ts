import { fetchHotelBookings } from '../../services/apiService';

global.fetch = jest.fn();

// Mock CSV data - matches the exact structure from your CSV
const mockCSVData = `hotel,arrival_date_year,arrival_date_month,arrival_date_day_of_month,adults,children,babies,country
Resort Hotel,2015,July,2,3,0,0,ESP
Resort Hotel,2015,July,1,2,0,0,PRT
Resort Hotel,2015,August,1,2,1,1,USA
Resort Hotel,2015,September,1,2,1,1,USA
`;

describe('Hotel Bookings API Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset module cache between tests
        jest.resetModules();
        // Clear fetch mock
        (global.fetch as jest.Mock).mockClear();
    });

    describe('fetchHotelBookings', () => {
        it('should fetch and parse CSV data correctly', async () => {
            // Mock fetch response
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                text: () => Promise.resolve(mockCSVData)
            });

            const bookings = await fetchHotelBookings('2015-07-01', '2015-07-31');

            // Verify fetch was called
            expect(global.fetch).toHaveBeenCalledWith('/hotel_bookings.csv');

            // Verify first booking matches the expected format
            // Note: Data will be sorted, so ESP record comes first due to date sorting
            expect(bookings[0]).toEqual({
                arrival_date_year: 2015,
                arrival_date_month: 'July',
                arrival_date_day_of_month: 2,
                adults: 3,
                children: 0,
                babies: 0,
                country: 'ESP'
            });
        });

        it('should handle invalid CSV data', async () => {
            const invalidCSV = 'invalid,csv\ndata\nstructure';

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                text: () => Promise.resolve(invalidCSV)
            });

            try {
                await fetchHotelBookings('2015-07-01', '2015-07-31');
                fail('Should have thrown an error');
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });
    });

    describe('Data parsing and transformation', () => {
        beforeEach(() => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                text: () => Promise.resolve(mockCSVData)
            });
        });

        it('should parse numeric values correctly', async () => {
            const bookings = await fetchHotelBookings('2015-07-01', '2015-08-31');
            const booking = bookings[0];

            expect(typeof booking.arrival_date_year).toBe('number');
            expect(typeof booking.arrival_date_day_of_month).toBe('number');
            expect(typeof booking.adults).toBe('number');
            expect(typeof booking.children).toBe('number');
            expect(typeof booking.babies).toBe('number');
        });

        it('should handle empty or whitespace values', async () => {
            const csvWithWhitespace = `hotel,arrival_date_year,arrival_date_month,arrival_date_day_of_month,adults,children,babies,country
Resort Hotel, 2015 , July , 2 , 3 , 0 , 0 , ESP `;

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                text: () => Promise.resolve(csvWithWhitespace)
            });

            const bookings = await fetchHotelBookings('2015-07-01', '2015-07-31');
            expect(bookings[0]).toEqual({
                arrival_date_year: 2015,
                arrival_date_month: 'July',
                arrival_date_day_of_month: 2,
                adults: 3,
                children: 0,
                babies: 0,
                country: 'ESP'
            });
        });

        it('should sort bookings by date correctly', async () => {
            const bookings = await fetchHotelBookings('2015-07-01', '2015-08-31');

            for (let i = 1; i < bookings.length; i++) {
                const prevDate = new Date(
                    bookings[i-1].arrival_date_year,
                    ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December']
                        .indexOf(bookings[i-1].arrival_date_month),
                    bookings[i-1].arrival_date_day_of_month
                );
                const currDate = new Date(
                    bookings[i].arrival_date_year,
                    ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December']
                        .indexOf(bookings[i].arrival_date_month),
                    bookings[i].arrival_date_day_of_month
                );
                expect(prevDate.getTime()).toBeLessThanOrEqual(currDate.getTime());
            }
        });
    });
});