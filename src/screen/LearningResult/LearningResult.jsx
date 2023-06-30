import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import LearningResult from '../../components/study_result/StudyResult'


export default function LearningResult_scr() {
  const [isSideBarOpen, setSideBarIsOpen] = useState(false);

  function toggleSidebar() {
    setSideBarIsOpen(!isSideBarOpen);
  }
  return (
    <div className='homeScreen_js' >
      <div className='Header'>
        <TopHeader toggleSidebar={toggleSidebar}/>
      </div>
      <div className='Body'> 
        {isSideBarOpen && <SideBar />}
        <div className='MainContent'>
          <LearningResult/>
        </div>
        <div className='Right-Cont'>
          <Calendar/>
          <Notification/>
        </div>
      </div>
    </div>
  )
}
