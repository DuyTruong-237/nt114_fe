import axios from 'axios';
import Cookies from 'js-cookie';
// Thiết lập interceptor
axios.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); // Lấy token từ nơi bạn đã lưu trữ (localStorage, cookie, ...)
    if (token) {
      config.headers.Authorization =token ; // Thêm token vào tiêu đề Authorization
      console.log(config.headers.Authorization)
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios