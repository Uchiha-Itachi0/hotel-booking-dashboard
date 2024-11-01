import React from "react";

interface DateRangePickerProps {
    dateRange: { start: string; end: string };
    onDateChange: (name: string, value: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
                                                                    dateRange,
                                                                    onDateChange
                                                                }) => (
    <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
            </label>
            <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={(e) => onDateChange(e.target.name, e.target.value)}
                className="
                    w-full
                    px-4
                    py-2.5
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    shadow-sm
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    outline-none
                    transition-all
                    duration-200
                    hover:border-gray-300
                    [&::-webkit-calendar-picker-indicator]:bg-center
                    [&::-webkit-calendar-picker-indicator]:p-2
                    [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:hover:opacity-60
                "
            />
        </div>
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
            </label>
            <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={(e) => onDateChange(e.target.name, e.target.value)}
                className="
                    w-full
                    px-4
                    py-2.5
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    shadow-sm
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    outline-none
                    transition-all
                    duration-200
                    hover:border-gray-300
                    [&::-webkit-calendar-picker-indicator]:bg-center
                    [&::-webkit-calendar-picker-indicator]:p-2
                    [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:hover:opacity-60
                "
            />
        </div>
    </div>
);