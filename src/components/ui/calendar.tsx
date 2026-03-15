import React from "react";

interface CalendarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Calendar: React.FC<CalendarProps> = ({ className, ...props }) => {
  return (
    <input
      type="date"
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Calendar;
