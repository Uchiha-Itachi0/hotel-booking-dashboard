
export interface HotelBooking {
    arrival_date_year: number;
    arrival_date_month: string;
    arrival_date_day_of_month: number;
    adults: number;
    children: number;
    babies: number;
    country: string;
}

const MOCK_DATA: HotelBooking[] = (() => {
    const countries = ['USA', 'UK', 'France', 'Germany', 'Spain', 'Italy', 'China', 'Japan', 'Brazil', 'Canada'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const bookings: HotelBooking[] = [];

    for (let i = 0; i < 1000; i++) {
        const date = new Date(2024, 0, 1);
        date.setDate(date.getDate() + Math.floor(Math.random() * 365));

        bookings.push({
            arrival_date_year: date.getFullYear(),
            arrival_date_month: months[date.getMonth()],
            arrival_date_day_of_month: date.getDate(),
            adults: Math.floor(Math.random() * 4) + 1,
            children: Math.floor(Math.random() * 3),
            babies: Math.floor(Math.random() * 2),
            country: countries[Math.floor(Math.random() * countries.length)]
        });
    }

    return bookings.sort((a, b) => {
        const dateA = new Date(a.arrival_date_year, months.indexOf(a.arrival_date_month), a.arrival_date_day_of_month);
        const dateB = new Date(b.arrival_date_year, months.indexOf(b.arrival_date_month), b.arrival_date_day_of_month);
        return dateA.getTime() - dateB.getTime();
    });
})();

export const fetchHotelBookings = async (startDate: string, endDate: string): Promise<HotelBooking[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return MOCK_DATA;
};