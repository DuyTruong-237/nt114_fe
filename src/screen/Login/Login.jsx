import "./Login.css"
import React from 'react'
import mainlogo from '../../img/mainlogo.png'
export default function login() {
  return(
    <div className="Login">
      <div className="Login-part">
        <img 
        className="LoginLogo"
        src={mainlogo}
        alt="Logo"/>
          <div className="nameapp">
            <b>HOGWART</b> 
          </div>
      </div>

      <div className="login-page">
        <div className="container">
          <div className="left">
            <div className="textlogin"><b>LOGIN</b></div>
            <div className="slogan">Hello! Welcome to Hogwart.</div>

      <div className="page">
        <div className="form">
          <div className="login-form">
            <div>Student ID</div>
            <input type="text" className="login_details" placeholder="username" />
            <div>Password</div>
            <input type="password" className="login_details" placeholder="password" />
            <button class="buttonLogin"><b>LOG IN</b></button>
            <div className="message">Forgot your password? <a href=" ">Forgot password</a></div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
     </div>
    )
}