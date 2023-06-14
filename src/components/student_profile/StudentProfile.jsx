import React, {useState, useEffect} from 'react'
import './StudentProfile.css';
import avatar from '../../img/user.png';
import { useParams } from 'react-router-dom';

import axios from 'axios';



export default function StudentProfile() {
  const { id } = useParams();
  console.log(id);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/student/getStudent/${id}`)
      .then((response) => {
        const studentData = response.data;
        setStudent(studentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }
  return (

    <div className='Profile_wrapper'>
        <div className='Title'>THÔNG TIN SINH VIÊN</div>
        <div className='Student_wrapper'>
            <img className='Avatar_Profile' src={avatar}  />
            <div className='Name_ID_wrapper'>
                <div className='Student_name'>{student.name}</div>
                <div className='Student_ID'>{student.id} | Sinh viên</div>
            </div> 
        </div>
        <div className='Info_Wrapper'>
          <div className='Edit_btn_profile_wrapper'>
            <div className='Edit_btn_profile btn_radius'><b>Tùy chỉnh</b></div>
            <div className='Edit_btn_profile btn_radius'><b>Lưu</b></div>
          </div>
          <div className='Info_Profile'>
            <div className='Text_Info_first'>Họ và tên: {student.name || null} </div>
            <div className='Text_Info'>Giới tính: {student.sex || null} </div>
            <div className='Text_Info'>Ngày, tháng, năm sinh: {student.dob || null} </div>
            <div className='Text_Info'>Email: {student.email || null} </div>
            <div className='Text_Info'>Điện thoại: {student.phone_num || null} </div>
            <div className='Text_Info'>Khoa: {student.department_id?.name || null} </div>
            <div className='Text_Info'>Ngành học: {student.major|| null}</div>
            <div className='Text_Info'>Lớp học: {student.acclass_id?.name || null}</div>
            <div className='Text_Info_final'> Địa chỉ tạm trú: {student.address || null}<br></br>
            <label> 
                <input type="checkbox"></input>
                <span class="checkmark"></span>
                Ký túc xá ĐHQG - HCM<br></br>
            </label>
            <label>
                <input type="checkbox"></input>
                <span class="checkmark"></span>
                Khác
            </label>
            <div className='Info_Bar_Wrapper'>
              <div className='Info_Bar'>
                Nơi sinh: <br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                CMND/CCCD: <br></br>
                <input className='Infobar-input' type='text'/>
              </div><div className='Info_Bar'>
                Ngày cấp CMND/CCCD:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Nơi cấp CMND/CCCD:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Dân tộc:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Tôn giáo:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Thông tin ngân hàng:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Số tài khoản:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>
              <div className='Info_Bar'>
                Chi nhánh:<br></br>
                <input className='Infobar-input' type='text'/>
              </div>  
            </div>                                                                                         
          </div>
        </div>
      </div>
    </div>
  )
}
