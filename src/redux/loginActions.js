import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';
import Cookies from 'js-cookie';

import { Navigate } from 'react-router-dom';
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
  });
  
  export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
    
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });
  setTimeout(() => {
    sessionStorage.removeItem('currentUser');
  }, 30 * 1000);
  const expiresIn30Seconds = 60 * 60 * 1000; // 30 giây
const expirationDate = new Date().getTime() + expiresIn30Seconds;
  export const login = (credentials,navigate) => {
    return (dispatch) => {
      dispatch(loginRequest());
      // Gọi API login
      axios.post('http://localhost:3001/v1/user/login', credentials)
        .then((response) => {
           
          const token = response.data.token;
          const user= response.data.user;
          // Lưu token vào cookie hoặc local storage
          // ...
          console.log(user)
          //document.cookie =("token="+token);
          //setCookie("tokens", token, 7);
          Cookies.set('token', token, { expires: new Date(expirationDate)  });
         
          localStorage.setItem('currentUser', JSON.stringify(user));
        
          dispatch(loginSuccess(user));
          navigate("/")
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; // Thời gian hết hạn là 30s
        localStorage.setItem('currentUserExpiration', expirationTime);

        // Xóa currentUser sau 30s
        setTimeout(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('currentUserExpiration');
        }, 60* 60 * 1000);
         
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
        });
    };
  };