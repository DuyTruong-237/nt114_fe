import React from 'react'
import './StudentProfile.css';
import avatar from '../../img/user.png';


export default function StudentProfile() {
  return (
    <div className='Profile_wrapper'>
        <div className='Title'>THÔNG TIN SINH VIÊN</div>
        <div className='Student_wrapper'>
            <img className='Avatar_Profile' src={avatar}  />
            <div className='Name_ID_wrapper'>
                <div className='Student_name'>Dương Duy Trường</div>
                <div className='Student_ID'>20522080 | Sinh viên</div>
            </div>
        </div>


    </div>
  )
}
