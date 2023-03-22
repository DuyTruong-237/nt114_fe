import React from 'react'
import homeicon from '../../img/homeicon.png'
import './SideBar.css'
//import '../../../public/img/mainlogo'


export default function SideBar() {
  return (
    <div className='SideBar'>
       <div className='SideBar-item'>
               
                  <img 
                  className="icon-img"
                  src={homeicon} 
                  alt="home" />
                
                <div className='SideBar-title-text'>
                  Trang chủ
                </div>
          </div>
          <div className='SideBar-item'>
               
               <img 
               className="icon-img"
               src={homeicon} 
               alt="home" />
             
             <div className='SideBar-title-text'>
               Trang chủ
             </div>
       </div>
       <div className='SideBar-item'>
               
               <img 
               className="icon-img"
               src={homeicon} 
               alt="home" />
             
             <div className='SideBar-title-text'>
               Trang chủ
             </div>
       </div>
       
      
    </div>
  )
}