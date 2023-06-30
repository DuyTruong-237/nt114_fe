import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import MainContent from '../../components/content/MainCourse';
import './Home.css';

export default function Home() {
  const [isSideBarOpen, setSideBarIsOpen] = useState(false);

  function toggleSidebar() {
    setSideBarIsOpen(!isSideBarOpen);
  }

  return (
    <div className='homeScreen_js'>
      <div className='Header-Home'>
        <TopHeader toggleSidebar={toggleSidebar} />
      </div>
      <div className='Body-Home'>
        {isSideBarOpen && <SideBar />}
        <div className='MainContent-Home'>
          <MainContent />
        </div>
        {/* <div className='Right-Cont'>
          <Calendar />
          <Notification />
        </div> */}
      </div>
    </div>
  );
}