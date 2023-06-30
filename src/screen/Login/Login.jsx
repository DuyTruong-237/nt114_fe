import "./Login.css"
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/loginActions';
import mainlogo from '../../img/mainlogo.png'
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(login({ userName, password },navigate));
  };
  return(
    <div className="Login">
      <div className="Login-part">
        <img 
        className="LoginLogo"
        src={mainlogo}
        alt="Logo"/>
          <div className="name_app">
            <b>HOGWART</b> 
          </div>
      </div>

      <div className="login-page">
        <div className="container">
          <div className="left">
            <div className="textlogin"><b>LOGIN</b></div>
            <div className="slogan-login">Hello! Welcome to Hogwart.</div>

      <div className="page">
        <div className="form">
          <div className="login-form">
            <div>Student ID</div>
            <input type="text" className="login_details" placeholder="username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            <div>Password</div>
            <input type="password" className="login_details" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button class="buttonLogin"  onClick={handleLogin} disabled={loginState.loading}><b>LOG IN</b></button>
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