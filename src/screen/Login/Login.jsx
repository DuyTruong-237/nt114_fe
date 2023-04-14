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
            <div className="slogan">Hello! Welcome to lalal.</div>

      <div className="page">
        <div className="from">
          <div className="login-from">
            <input type="text" className="text" placeholder="username" />
            <input type="password" className="pass" placeholder="password" />
            <button class="buttonLogin"><b>LOG IN</b></button>
            <p className="message">Forgot your password? <a href=" ">Forgot password</a>
            </p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
     </div>
    )
}