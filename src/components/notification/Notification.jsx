import React from 'react'
import './Notification.css'
import arrow from "../../img/previous.png"

export default function Notification() {
  return (
    <div className='Notification-wrapper'>
        <div className='Noti-Title'>
            Các thông báo
        </div>
        <div className='Noti-Content'>
            <img 
                className='arr-img' 
                src={arrow} 
                alt="arrow" />
            <div className='Content-Title'>
                Đổi giáo viên môn Phòng chống nghệ thuật hắc ám - 18/03/2023 - 15:15
            </div>
        </div>
        <div className='Noti-Content'>
            <img 
                className='arr-img' 
                src={arrow} 
                alt="arrow" />
            <div className='Content-Title'>
                Đăng ký học phần khóa 20 - 17/03/2023 - 0:30           
            </div>
        </div>
        <div className='Noti-Content'>
            <img 
                className='arr-img' 
                src={arrow} 
                alt="arrow" />
            <div className='Content-Title'>
                Đăng ký cứu xét môn Độc dược - 16/03/2023 - 12:00
            </div>
        </div>
        <div className='Noti-Content'>
            <img 
                className='arr-img' 
                src={arrow} 
                alt="arrow" />
            <div className='Content-Title'>
                Đón chào sinh viên Harry Porter nhập học - 15/03/2023 - 0:45
            </div>
        </div>
        <div className='Noti-Content'>
            <img 
                className='arr-img' 
                src={arrow} 
                alt="arrow" />
            <div className='Content-Title'>
                Thầy hiệu trưởng Dumbledore phát biểu đầu năm học mới 09/05/2023 - 0:00
            </div>
        </div>
    </div>
  )
}