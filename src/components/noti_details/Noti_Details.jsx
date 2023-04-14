import React, { Component } from 'react'
import User from "../../img/user.png";

export default class Noti_Details extends Component {
  render() {
    return (
      <div className='Noti_Details_wrapper'>
        <div className='Noti_Toolbar'>
            <div>Notification</div>
            <div>All</div>
            <div>Mark all as read</div>

            <div className='Noti_Details'>
                <label> 
                    <input type="checkbox"></input>
                    <span class="checkmark"></span>
                </label>
                <img  className='Noti_User' src={User} alt="user" />
            </div>
        </div>
      </div>
    )
  }
}
