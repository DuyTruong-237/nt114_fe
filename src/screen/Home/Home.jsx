import React from 'react'
import TopHeader from '../../components/top_header/TopHeader';
import SideBar from '../../components/side_bar/SideBar';
import Calendar from  '../../components/calendar/calendar';
import Notification from '../../components/notification/Notification';
import MainContent from '../../components/content/MainContent';
import './Home.css';

export default function Home() {
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
          <MainContent/>
        </div>
        <div className='Right-Cont'>
          <Calendar/>
          <Notification/>
        </div>
      </div>
      
    
    </div>
  )
}
