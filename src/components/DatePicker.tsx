import clsx from "clsx";
import { CalendarDays } from "lucide-react";
import { type FC, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    insideTable?: boolean;
}
const DatePickerInput: FC<DatePickerProps> = ({ selectedDate, onDateChange, insideTable = false }) => {

    return (
        <div>
            <div className="flex items-center gap-2 relative w-[160px]">
                <div className={clsx("absolute left-2 z-10 text-gray-500 top-[8px] dark:text-white")}>
                    <CalendarDays size={20}/>
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={(dateOnly) => {
                        if (dateOnly) {
                            const now = new Date();
                            const combinedDate = new Date(
                                dateOnly.getFullYear(),
                                dateOnly.getMonth(),
                                dateOnly.getDate(),
                                now.getHours(),
                                now.getMinutes(),
                                now.getSeconds()
                            );
                            onDateChange(combinedDate);
                        } else {
                            onDateChange(null);
                        }
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="w-[140px] pl-8 pr-4 border py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                    placeholderText='selectDate'
                    popperPlacement="bottom-start"
                    withPortal={insideTable}
                />
            </div>
        </div>
    )
}

export default DatePickerInput;