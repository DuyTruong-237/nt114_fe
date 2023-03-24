import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  function onChangeDate(date) {
    setDate(date);
  }
  // const customLocale = {
  //   weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //   weekdaysShort: ["S", "M", "T", "W", "T", "F", "S"],
  //   weekStartsOn: 0,
  // };
  return (
    <div>
      <Calendar
        // prevLabel={'<'}
        // nextLabel={'>'}
        className="react-calendar"
        // locale={customLocale}
        onChange={onChangeDate}
        value={date}
      />
    </div>
  );
}

export default MyCalendar;
