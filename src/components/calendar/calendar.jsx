import "flatpickr/dist/themes/material_green.css";
import './Calendar.css'
import Flatpickr from "react-flatpickr";
import { Component } from "react";

import React from 'react'

export default function Calendar() {
  return (
    <div className="Calendar">
      
    </div>
  )
}

// class Calendar extends Component {
//   constructor() {
//     super();

//     this.state = {
//       date: new Date()
//     };
//   }

//   render() {
//     const { date } = this.state;
//     return (
//       <Flatpickr
//         data-enable-time
//         value={date}
//         onChange={([date]) => {
//           this.setState({ date });
//         }}
//       />
//     );
//   }
  
// }
// export default Calendar;