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
        <div className='Customize-Page' >
          <button className='Customize_Page_Button'>Tùy chỉnh trang</button>
        </div>
        <div className="Profile_Info_wrapper">
          <ul id="User_Info_List">
              <li><strong>Họ và tên:</strong> Dương Duy Trường</li>
              <li><strong>Giới tính:</strong> Nam</li>
              <li><strong>Ngày, tháng, năm sinh:</strong> .../.../2002</li>
              <li><strong>Email:</strong> 20522080@gm.uit.edu.vn</li>
              <li><strong>Điện thoại:</strong> 0123456789</li>
              <li><strong>Khoa:</strong> Mạng máy tính và truyền thông</li>
              <li><strong>Ngành học:</strong> Mạng máy tính và truyền thông dữ liệu</li>
              <li><strong>Lớp học:</strong> MMCL2020</li>
              <li><strong>Địa chỉ tạm trú:</strong></li>
            <ul>
                <li>Ký túc xá ĐHQG - HCM</li>
                <li>Khác</li>
            </ul>
              <li><strong>Nơi sinh:</strong></li>
              <li><strong>CMND/CCCD:</strong></li>
            <ul>
                <li><strong>Số CMND/CCCD:</strong></li>
                <li><strong>Ngày cấp CMND/CCCD:</strong></li>
                <li><strong>Nơi cấp CMND/CCCD:</strong></li>
            </ul>
              <li><strong>Dân tộc:</strong></li>
              <li><strong>Tôn giáo:</strong></li>
              <li><strong>Thành phần xuất thân:</strong></li>
              <li><strong>Thông tin Ngân Hàng:</strong></li>
            <ul>
                <li><strong>Số tài khoản:</strong></li>
                <li><strong>Chi nhánh:</strong></li>
            </ul>
          </ul>
        </div>
    </div>
  )
}
