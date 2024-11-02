import { renderHook, act } from '@testing-library/react';
import { useHotelData } from '../../hooks/useDataHooks';
import { fetchHotelBookings } from '../../services/apiService';
import { formatDate, isDateInRange } from '../../utils/dateUtils';

// Mock the external dependencies
jest.mock('../../services/apiService');
jest.mock('../../utils/dateUtils');

describe('useHotelData', () => {
    // Mock implementation of our dependencies
    const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>;
    const mockIsDateInRange = isDateInRange as jest.MockedFunction<typeof isDateInRange>;
    const mockFetchHotelBookings = fetchHotelBookings as jest.MockedFunction<typeof fetchHotelBookings>;

    const mockBookings = [
        {
            arrival_date_year: 2024,
            arrival_date_month: 'January',
            arrival_date_day_of_month: 15,
            country: 'USA',
            adults: 2,
            children: 1,
            babies: 0
        },
        {
            arrival_date_year: 2024,
            arrival_date_month: 'January',
            arrival_date_day_of_month: 20,
            country: 'UK',
            adults: 2,
            children: 0,
            babies: 1
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        // Default mock implementations
        mockFormatDate.mockImplementation(() => '2024-01-15');
        mockIsDateInRange.mockImplementation(() => true);
        mockFetchHotelBookings.mockResolvedValue(mockBookings);
    });

    it('should handle loading state correctly', async () => {
        const dateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result } = renderHook(() => useHotelData(dateRange));

        // Initial loading state
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        // Wait for data to load
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // After loading
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle error state correctly', async () => {
        const mockError = new Error('Failed to fetch');
        mockFetchHotelBookings.mockRejectedValue(mockError);

        const dateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result } = renderHook(() => useHotelData(dateRange));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(mockError);
    });

    it('should calculate filtered data correctly', async () => {
        const dateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result } = renderHook(() => useHotelData(dateRange));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.filteredData).toHaveLength(2);
        expect(result.current.filteredData[0]).toEqual(expect.objectContaining({
            date: '2024-01-15',
            totalVisitors: 3 // 2 adults + 1 child + 0 babies
        }));
    });

    it('should calculate country data correctly', async () => {
        const dateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result } = renderHook(() => useHotelData(dateRange));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.countryData).toEqual([
            { country: 'USA', visitors: 3 },
            { country: 'UK', visitors: 3 }
        ]);
    });

    it('should calculate totals correctly', async () => {
        const dateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result } = renderHook(() => useHotelData(dateRange));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.totals).toEqual({
            adults: 4,
            children: 1
        });
    });

    it('should refetch data when date range changes', async () => {
        const initialDateRange = { start: '2024-01-01', end: '2024-01-31' };

        const { result, rerender } = renderHook(
            (props) => useHotelData(props),
            { initialProps: initialDateRange }
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Change date range
        const newDateRange = { start: '2024-02-01', end: '2024-02-28' };
        rerender(newDateRange);

        expect(mockFetchHotelBookings).toHaveBeenCalledTimes(2);
        expect(mockFetchHotelBookings).toHaveBeenLastCalledWith(
            newDateRange.start,
            newDateRange.end
        );
    });
});