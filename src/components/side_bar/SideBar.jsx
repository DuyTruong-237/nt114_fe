import React from 'react'
import homeicon from '../../img/home-icon-silhouette.png'
import studenicon from '../../img/student.png'
import teachericon from '../../img/teacher.png'
import chart from '../../img/barchart.png'
import './SideBar.css'
//import '../../../public/img/mainlogo'
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className='SideBar'>
       <Link to='/' className='SideBar-item'>
            <img 
              className="icon-img"
              src={homeicon} 
              alt="home" />
                
            <div className='SideBar-title-text'>
              Trang chủ
            </div>
      </Link>
      <Link to='/class-detail' className='SideBar-item'>
          <img 
            className="icon-img"
            src={studenicon} 
            alt="student" />
             
          <div className='SideBar-title-text'>
            Sinh viên    
          </div>
       </Link> 
       <Link to='/' className='SideBar-item'>
          <img 
            className="icon-img"
            src={teachericon} 
            alt="lecturer" />
             
          <div className='SideBar-title-text'>
            Giảng viên
          </div>             
       </Link>
       <Link to='/' className='SideBar-item'>
          <img 
            className="icon-img"
            src={chart} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Thống kê
          </div>          
       </Link>
    </div>
  )
}