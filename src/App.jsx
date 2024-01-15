import React, { useEffect, useState } from 'react';
import Calendar from './calendar/Calendar';

// const calendarId = 'your_calendar_id';
// const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;


function App() {
  const [calendarData, setCalendarData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiUrl);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setCalendarData(data); // Store data in state
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData(); // Call the function when the component mounts
  // }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <Calendar  /> {/* Pass data to Calendar component */}
    </>
  );
}

export default App;
