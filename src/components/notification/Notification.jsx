import React,  { useState, useEffect } from 'react'
import './Notification.css'
import axios from 'axios'
import arrow from "../../img/previous.png"

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const date = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${date} - ${hours}:${minutes}`;
  }
export default function Notification() {
   
    const [notis, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/v1/abc/getAll/notification')
        .then(response =>{
           
             const notis= response.data;
            console.log(notis)
           
            setData(notis);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
  return (
    <div className='Notification-wrapper'>
        <div className='Noti-Title'>
            Các thông báo
        </div>
        <div className='Noti-Content-wrapper'>
            {notis.map(noti =>(<a className='Noti-Content' href=''>
                <img 
                    className='arr-img' 
                    src={arrow} 
                    alt="arrow" />
                <div className='Content-Title'>
                    {noti.title+" - "+ formatDateTime(noti.day)}
                </div>
            </a>))}
            
            {/* <a className='Noti-Content' href=''>
                <img 
                    className='arr-img' 
                    src={arrow} 
                    alt="arrow" />
                <div className='Content-Title'>
                    Đăng ký học phần khóa 20 - 17/03/2023 - 0:30           
                </div>
            </a>
            <a className='Noti-Content' href=''>
                <img 
                    className='arr-img' 
                    src={arrow} 
                    alt="arrow" />
                <div className='Content-Title'>
                    Đăng ký cứu xét môn Độc dược - 16/03/2023 - 12:00
                </div>
            </a>
            <a className='Noti-Content' href=''>
                <img 
                    className='arr-img' 
                    src={arrow} 
                    alt="arrow" />
                <div className='Content-Title'>
                    Đón chào sinh viên Harry Porter nhập học - 15/03/2023 - 0:45
                </div>
            </a>
            <a className='Noti-Content' href=''>
                <img 
                    className='arr-img' 
                    src={arrow} 
                    alt="arrow" />
                <div className='Content-Title'>
                    Thầy hiệu trưởng Dumbledore phát biểu đầu năm học mới 09/05/2023 - 0:00
                </div>
            </a> */}
        </div>
        
    </div>
  )
}
