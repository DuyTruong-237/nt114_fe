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
          Cookies.set('token', token, { expires: 7 });
          dispatch(loginSuccess(user));
          navigate("/")
         
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
        });
    };
  };