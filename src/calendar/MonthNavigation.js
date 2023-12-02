// src/components/Calendar/MonthNavigation.js
import React from "react";

const MonthNavigation = ({ currentMonth, onMonthChange,setShowTaskBox }) => {
  const handleMonthChange = (newMonth) => {
    onMonthChange(newMonth);
    setShowTaskBox(false)
  };

  return (
    <div className="flex items-center gap-2  justify-between mb-4 px-4">
      {[...Array(12).keys()].map((month) => (
        <button
          key={month}
          onClick={() => handleMonthChange(month + 1)}
          className={`bg-gray-200 px-3 py-1  ${
            currentMonth >= month + 1 ? " bg-black text-white" : ""
          }`}
        >
        </button>
      ))}
    </div>
  );
};


export default MonthNavigation;
