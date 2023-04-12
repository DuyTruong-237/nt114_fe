import React from 'react'
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import StudentProfile from '../../components/student_profile/StudentProfile'

export default function Login() {
    return (
        <div className='homeScreen_js'>
          <div className='Header'>
            <TopHeader/>
          </div>
          <div className='Body'> 
            <div className='SideBar'>
              <SideBar/>
            </div>
            <div className='Main-Content'>
              <StudentProfile/>
            </div>
            <div className='Right-Cont'>
              <Calendar/>
              <Notification/>
            </div>
          </div>
          
        
        </div>
      )
}

