import React,{ useState, useEffect }  from 'react'
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import ClassDetail from '../../components/class_detail/ClassDetail';
import './ClassDetails.css';

export default function ClassDetails_scr() {
  useEffect(() => {
   
  }, []);
  return (
    <div className='homeScreen_js-class'>
      
      <div className='Body-class'> 
       
        <div className='MainContent-class'>
          <ClassDetail/>
        </div>
       
      </div>
    </div>
  )
}
