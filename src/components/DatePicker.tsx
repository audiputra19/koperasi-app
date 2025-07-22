import { CalendarDays } from "lucide-react";
import { type FC, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}
const DatePickerInput: FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {

    return (
        <div>
            <div className="relative">
                <div className="absolute z-10 text-gray-500 left-2 top-[6px] dark:text-white">
                    <CalendarDays/>
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={onDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-[140px] pl-10 pr-4 border py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                    placeholderText='selectDate'
                    popperPlacement="bottom-start"
                />
            </div>
        </div>
    )
}

export default DatePickerInput;