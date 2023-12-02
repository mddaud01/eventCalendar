// src/components/Calendar/Calendar.js
import React, { useState } from "react";
import { startOfMonth, format } from "date-fns";
import MonthNavigation from "./MonthNavigation";
import CalendarGrid from "./CalendarGrid";
import TaskBox from "./TaskBox";
import UpcomingEvents from "./UpcomingEvents";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskBox, setShowTaskBox] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [events, setEvents] = useState({
    "2023-12": {
      "2023-12-05": "Meeting with client",
      "2023-12-10": "Project deadline",
      
    },
    
  });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    setShowTaskBox(true);
  };

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    setSelectedDate(null); 
    
  };

  const handleAddEvent = () => {
    if (selectedDate && eventInput.trim() !== "") {
      const monthKey = format(selectedDate, "yyyy-MM");
      setEvents((prevEvents) => ({
        ...prevEvents,
        [monthKey]: {
          ...prevEvents[monthKey],
          [format(selectedDate, "yyyy-MM-dd")]: eventInput,
        },
      }));
      setEventInput("");
    }
    setShowTaskBox(false);

  };

  const handleShowEvents = () => {
    setShowTaskBox(true);
  };

  const onEditEventTitle = (editedDate, newTitle) => {
    if (editedDate && newTitle.trim() !== "") {
      const monthKey = format(editedDate, "yyyy-MM");
      const dateKey = format(editedDate, "yyyy-MM-dd");

      setEvents((prevEvents) => ({
        ...prevEvents,
        [monthKey]: {
          ...prevEvents[monthKey],
          [dateKey]: newTitle,
        },
      }));
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white rounded shadow p-4">
        
        
        <div className=" px-2">
          {/* Display current month */}
        <div className="text-xl font-bold mb-4 px-4">
          {format(
            startOfMonth(
              new Date(new Date().getFullYear(), currentMonth - 1, 1)
            ),
            "MMMM"
          )}
        </div>
           {/* Month Navigation Tabs */}
        <MonthNavigation
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          setShowTaskBox={setShowTaskBox}
        />
        {/* Calendar Grid */}
        <CalendarGrid
          currentMonth={currentMonth}
          events={events}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />

        </div>
       
      </div>
      <div className="upcoming">
        {
          showTaskBox ? (
            <TaskBox
              selectedDate={selectedDate}
              eventInput={eventInput}
              onEventInputChange={(e) => setEventInput(e.target.value)}
              onAddEvent={handleAddEvent}
              onClose={() => setShowTaskBox(false)}
              onShowEvents={handleShowEvents}
              events={events}
              onEditEventTitle={onEditEventTitle}
            />
          ):
       
       <UpcomingEvents events={events} />
   
        }
      </div>
    </div>
  );
};

export default Calendar;
