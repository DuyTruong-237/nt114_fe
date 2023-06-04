import React from 'react'
import './Message.css'
import User from '../../img/user.png'

export default function 
() {
  return (
    <div className='Message_wrapper'>
        <div className='Noti_Toolbar'>
            <div>Notification</div>
            <div>All</div>
            <div>Mark all as read</div>
            <div class="eclipse"></div>
        </div>
        <div className='Message_Details'>
            <label className='Check'> 
                <input type="checkbox"></input>
                <span class="checkmark"></span>
            </label>
            <img  className='Noti_User' src={User} alt="user" />
            <div>Phạm Thị, Nhung </div>
            <div>Thông báo v/v đăng ký ĐACN với VP Khoa - Chào các bạn,</div>
        </div>
        <div className='Message_Details_2'>
            <label className='Check'> 
                <input type="checkbox"></input>
                <span class="checkmark"></span>
            </label>
            <img  className='Noti_User' src={User} alt="user" />
            <div>Trương Quốc, Dũng </div>
            <div className='Message_Brief'>
                <div>Thư xác nhận tham gia Talkshow "Chat GPT: Cơ hội và</div>
                <div>ChatGPT1432</div>
            </div>
            
        </div>
      </div>
  )
}
