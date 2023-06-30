import './Profile.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import StudentProfile from '../../components/student_profile/StudentProfile';

export default function Login() {
  const { id } = useParams();
  const temp = id;
  const [isSideBarOpen, setSideBarIsOpen] = useState(false);

  function toggleSidebar() {
    setSideBarIsOpen(!isSideBarOpen);
  }

  return (
    <div className="homeScreen_js">
      <div className="Header">
        <TopHeader toggleSidebar={toggleSidebar}/>
      </div>
      <div className="Body">
        {isSideBarOpen && <SideBar />}
        <div className="MainContent">
         <StudentProfile/>
        </div>
        <div className="Right-Cont">
          <Calendar />
          <Notification />
        </div>
      </div>
    </div>
  );
}
