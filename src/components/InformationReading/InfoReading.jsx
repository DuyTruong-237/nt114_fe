import React, {useState, useEffect} from 'react'
import './InfoReading.css'
import { useParams } from 'react-router-dom';

import axios from '../../redux/axios-interceptor';

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const date = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${date} - ${hours}:${minutes}`;
}

export default function Info_Reading() {
  const { id } = useParams();
  const [Noti, setNotis] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/abc/getID/notification/${id}`)
      .then((response) => {
        const notiData = response.data;
        setNotis(notiData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!Noti) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Info_Reading_Wrapper'>
        <h1 className='Info_Reading_Title'>{Noti.title}</h1>
        <div className='Info_Reading_Details'>
            <div className='Info_Reading_Date'>Date: {formatDateTime(Noti.day)}</div>
            <div className='Info_Reading_Info'>
                <div>From: </div>
                <div>To: </div>
            </div>   
        </div>
        <p className='Info_Reading_Content'>{Noti.des}</p>
    </div>
  )
}
