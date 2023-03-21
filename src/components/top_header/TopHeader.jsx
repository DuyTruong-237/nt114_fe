import React from 'react'
import mainlogo from '../../img/mainlogo.png'
import userimg from '../../img/user.png'
import './TopHeader.css'
//import '../../../public/img/mainlogo'


export default function TopHeader() {
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
        />
         
        </div>
      
    </div>
  )
}
