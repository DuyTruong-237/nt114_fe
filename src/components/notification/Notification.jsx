import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Notification.css';
import axios from 'axios';
import arrow from '../../img/previous.png';

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
  const [notis, setNotis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/abc/getAll/notification')
      .then(response => {
        const notis = response.data;
        setNotis(notis);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNotificationClick = notificationId => {
    navigate(`/noti/${notificationId}`);
  };

  return (
    <div className='Notification-wrapper'>
      <div className='Noti-Title'>Các thông báo</div>
      <div className='Noti-Content-wrapper'>
        {notis.map(noti => (
          <Link
            className='Noti-Content'
            to={`/noti/${noti._id}`}
            key={noti.id}
            onClick={() => handleNotificationClick(noti._id)}
          >
            <img className='arr-img' src={arrow} alt='arrow' />
            <div className='Content-Title'>
              {noti.title} - {formatDateTime(noti.day)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
