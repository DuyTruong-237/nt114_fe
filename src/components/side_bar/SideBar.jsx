import React from 'react'
import homeicon from '../../img/home-icon-silhouette.png'
import studenicon from '../../img/student.png'
import teachericon from '../../img/teacher.png'
import departmenticon from '../../img/department.png'
import classicon from '../../img/books (1).png'
import result from '../../img/score.png'
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
      <Link to='/student' className='SideBar-item'>
          <img 
            className="icon-img"
            src={studenicon} 
            alt="student" />
             
          <div className='SideBar-title-text'>
            Sinh viên    
          </div>
       </Link> 
       <Link to='/lecturer' className='SideBar-item'>
          <img 
            className="icon-img"
            src={teachericon} 
            alt="lecturer" />
             
          <div className='SideBar-title-text'>
            Giảng viên
          </div>             
       </Link>
       <Link to='/department' className='SideBar-item'>
          <img 
            className="icon-img"
            src={departmenticon} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Khoa
          </div>          
       </Link>
       <Link to='/learning-result' className='SideBar-item'>
          <img 
            className="icon-img"
            src={result} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Bảng điểm
          </div>          
       </Link>
       <Link to='/subject-manage' className='SideBar-item'>
          <img 
            className="icon-img"
            src={classicon} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Môn học
          </div>          
       </Link>

    </div>
  )
}