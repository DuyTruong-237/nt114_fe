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
        <div className='Info_Wrapper'>
          <button className='Edit_btn btn_radius'><b>Tùy chỉnh trang</b></button>
          <div className='Info_Profile'>
            <div className='Text_Info_first'>Họ và tên: Dương Duy Trường</div>
            <div className='Text_Info'>Giới tính: Nam</div>
            <div className='Text_Info'>Ngày, tháng, năm sinh: .../.../ 2002</div>
            <div className='Text_Info'>Email: 20522080@gm.uit.edu.vn</div>
            <div className='Text_Info'>Điện thoại: 0123456789</div>
            <div className='Text_Info'>Khoa: Mạng máy tính và truyền thông</div>
            <div className='Text_Info'>Ngành học: Mạng máy tính và truyền thông dữ liệu</div>
            <div className='Text_Info'>Lớp học: MMCL2020</div>
            <div className='Text_Info_final'>Địa chỉ tạm trú:<br></br>
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
