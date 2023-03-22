import React from 'react'
import homeicon from '../../img/homeicon.png'
import './SideBar.css'
//import '../../../public/img/mainlogo'


export default function SideBar() {
  return (
    <div className='SideBar'>
       <div className='home'>
                <div classname='home-icon'>
                  <img 
                  classname="icon-img"
                  src={homeicon} 
                  alt="home" />
                </div>
                <div classname='home-text'>
                  Trang chủ
                </div>
          </div>
       
      
    </div>
  )
}