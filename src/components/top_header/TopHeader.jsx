import React from 'react'
import mainlogo from '../../img/mainlogo.png'
import userimg from '../../img/user.png'
import './TopHeader.css'
//import '../../../public/img/mainlogo'

import { useState } from 'react';
export default function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function handleUserImgClick() {
    setIsOpen(!isOpen);}
  return (
    <div className='topheader'>
        <div className='topHeader-part'> 
         <img
          className="Header_Logo"
          src={mainlogo}
          alt="logo"
        />
        <div className='nameapp'>
            Hogwart
        </div>
        </div>
        <div className='topHeader-part topHeader-part-user'>
            <div className='topHeader-user-username'>
                Harry Porter
            </div>
            <img
          className="topHeader-userimg"
          src={userimg}
          alt="logo"
          onClick={handleUserImgClick}
        />
         {isOpen && (
              <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <i className="fas fa-id-card" aria-hidden="true"></i>
                Hồ sơ
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                Tin nhắn
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-cog" aria-hidden="true"></i>
                Tùy chọn
              </a>
              <a href="login" className="dropdown-item">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                Đăng xuất
              </a>
            </div>
            
            )}
        </div>
      
    </div>
  )
}
