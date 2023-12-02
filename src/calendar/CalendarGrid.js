import React, { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const CalendarGrid = ({ currentMonth, events, onDateClick }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(
    new Date(currentDate.getFullYear(), currentMonth - 1, 1)
  );
  const lastDayOfMonth = endOfMonth(
    new Date(currentDate.getFullYear(), currentMonth - 1, 1)
  );
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });
  console.log(daysOfMonth,'---')

  const [clickedDate, setClickedDate] = useState(null);

  const handleDateClick = (day) => {
    setClickedDate(day);
    onDateClick(day);
  };

  return (
    <div className="grid grid-cols-7 gap-0  justify-center">
      {days.map((day) => (
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}

      {daysOfMonth.map((day) => {
        const monthKey = format(day, "yyyy-MM");
        const isEventDate =
          events[monthKey] && events[monthKey][format(day, "yyyy-MM-dd")];

        return (
          <div
            key={day.toISOString()}
            className={`
              text-center p-2 w-10 h-10 rounded-full cursor-pointer relative 
              ${isToday(day) ? "font-bold" : ""}
              ${
                clickedDate &&
                format(clickedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                  ? "border clickBg text-white" 
                  : ""
              }
              ${isEventDate ? "has-event" : ""}
            `}
            onClick={() => handleDateClick(day)}
          >
            {format(day, "d")}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
