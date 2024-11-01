import React from "react";

interface DateRangePickerProps {
    dateRange: { start: string; end: string };
    onDateChange: (name: string, value: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
                                                                    dateRange,
                                                                    onDateChange
                                                                }) => (
    <div className="flex gap-4 mb-6">
        <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={(e) => onDateChange(e.target.name, e.target.value)}
                className="border rounded p-2"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={(e) => onDateChange(e.target.name, e.target.value)}
                className="border rounded p-2"
            />
        </div>
    </div>
);