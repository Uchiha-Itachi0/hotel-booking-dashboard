
export const formatDate = (year: number, month: string, day: number): string => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex, day).toISOString().split('T')[0];
};

export const isDateInRange = (date: string, startDate: string, endDate: string): boolean => {
    return date >= startDate && date <= endDate;
};