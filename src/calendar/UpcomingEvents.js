import React, { useCallback, useState } from "react";
import { format } from "date-fns";

const UpcomingEvents = ({ events }) => {
  const currentDate = new Date();

  // generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Get upcoming events
  const upcomingEvents = getUpcomingEvents(events, currentDate);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
      <div className="flex flex-wrap">
        {upcomingEvents.map(({ date, title }, index) => {
          const eventColor = getRandomColor(); // Generate a random color for each event
          return (
            <div
              key={`${date}-${title}`}
              className={`bg-${
                index % 2 === 0 ? "blue" : "green"
              }-100 p-2 mb-2 mr-2  flex items-center flex-col text-white min-w-[100px]`}
              style={{ backgroundColor: eventColor }}
            >
              <div className="mr-2" style={{ fontSize: "90px" }}>
                {format(date, "d")}
              </div>
              <div>
                <strong>{title}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Function to get upcoming events
const getUpcomingEvents = (events, currentDate) => {
  const upcomingEvents = [];

  // Iterate over months and events to find upcoming events
  for (const monthKey in events) {
    for (const dateKey in events[monthKey]) {
      const eventDate = new Date(dateKey);
      if (eventDate >= currentDate) {
        upcomingEvents.push({
          date: eventDate,
          title: events[monthKey][dateKey],
        });
      }
    }
  }

  // Sort upcoming events by date
  upcomingEvents.sort((a, b) => a.date - b.date);

  return upcomingEvents;
};

export default UpcomingEvents;
