import React from 'react'

export default function Info_Reading() {
  return (
    <div className='Info_Reading_Wrapper'>
        <h1 className='Info_Reading_Title'>Noti</h1>
        <div className='Info_Reading_Details'>
            <div className='Info_Reading_Date'>Date: {email.sender}</div>
            <div className='Info_Reading_Info'>
                <h2>From: </h2>
                <h2>To: </h2>
            </div>   
        </div>
        <p>Content</p>
    </div>
  )
}
