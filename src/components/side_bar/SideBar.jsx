import React from 'react'
import homeicon from '../../img/home-icon-silhouette.png'
import classicon from '../../img/class.png'
import studenicon from '../../img/student.png'
import teachericon from '../../img/teacher.png'
import departmenticon from '../../img/department.png'
import { useSelector } from 'react-redux';
import subjecticon from '../../img/books (1).png'
import result from '../../img/score.png'
import './SideBar.css'
//import '../../../public/img/mainlogo'
import { Link } from 'react-router-dom';
import Student from '../manage/Student'

export default function SideBar({ isOpen, isDefaultHidden }) {
  const user = useSelector((state) => state.login?.currentUser);
  return (
    <div className={`SideBar ${isOpen ? 'open' : ''}`}>
      <Link to='/' className='SideBar-item'>
            <img 
              className="icon-img"
              src={homeicon} 
              alt="home" />
                
            <div className='SideBar-title-text'>
              Trang chủ
            </div>
      </Link>
      {
        user?.position=="admin"?  <> <Link to='/student' className='SideBar-item'>
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
     </Link></>:""
      }
     
       <Link to='/department' className='SideBar-item'>
          <img 
            className="icon-img"
            src={departmenticon} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Khoa
          </div>          
       </Link>
      
             {
                user?.position=="student"?
                <Link to={`/learning-result/myresult/${user?._id}`} className='SideBar-item'>
                <img 
                  className="icon-img"
                  src={result} 
                  alt="statistic" />
                  <div className='SideBar-title-text'>
            Bảng điểm
          </div>          
       </Link>
       :
       ""

             }
          
       <Link to='/subject-manage' className='SideBar-item'>
          <img 
            className="icon-img"
            src={subjecticon} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Môn học
          </div>          
       </Link>
       {user? <Link to='/class-detail' className='SideBar-item'>
          <img 
            className="icon-img"
            src={classicon} 
            alt="statistic" />
             
          <div className='SideBar-title-text'>
            Lớp học
          </div>          
       </Link>:""
       
        
       }
       
    </div>
  )
}