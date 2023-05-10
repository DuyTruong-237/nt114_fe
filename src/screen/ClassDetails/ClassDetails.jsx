import React from 'react'
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import ClassDetail from '../../components/class_detail/ClassDetail';
import './ClassDetails.css';

export default function ClassDetails_scr() {
  return (
    <div className='homeScreen_js'>
      <div className='Header'>
        <TopHeader/>
      </div>
      <div className='Body'> 
        <div className='SideBar'>
          <SideBar/>
        </div>
        <div className='MainContent'>
          <ClassDetail/>
        </div>
        <div className='Right-Cont'>
          <Calendar/>
          <Notification/>
        </div>
      </div>
    </div>
  )
}
