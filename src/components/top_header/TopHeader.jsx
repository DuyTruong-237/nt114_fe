import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainlogo from '../../img/mainlogo.png';
import userimg from '../../img/user.png';
import './TopHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import MenuIcon from '../../img/menu.png';
import SideBar from '../side_bar/SideBar';

export default function TopHeader() {
  const location = useLocation();
  const user = useSelector((state) => state.login?.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBarOpen, setSideBarIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 700; // Độ dài cuộn (px) khi màu nền thay đổi

    if (scrollPosition > scrollThreshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  function handleUserImgClick() {
    setIsOpen(!isOpen);
  }

  function logout() {
    axios
      .post('http://localhost:3001/v1/user/logout')
      .then((response) => {
        Cookies.remove('token');
        localStorage.removeItem('currentUser');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  function handleLogoClick() {
    navigate('/');
  }

  function toggleSidebar() {
    setSideBarIsOpen(!isSideBarOpen);
  }

  let headerClass = location.pathname === '/' ? 'home-header' : 'top-header';

  return (
    <div className={`${headerClass} ${isScrolled ? 'scrolled' : ''}`}>
      {isSideBarOpen && <SideBar />}
      <div onClick={toggleSidebar} className="Menu_btn">
        <img src={MenuIcon} alt="Menu" />
      </div>

      <div onClick={handleLogoClick} className="topHeader-part">
        <img className="Header_Logo" src={mainlogo} alt="logo" />
        <div className="nameapp">Hogwart</div>
      </div>
      <div className="topHeader-part topHeader-part-user">
        {user ? (
          <>
            <div className="topHeader-user-username">{user.userName || ''}</div>
            <img
              className="topHeader-userimg"
              src={user.avatar ? "http://localhost:3001/uploads/" + user.avatar : userimg}
              alt="avatar"
              onClick={handleUserImgClick}
            />
          </>
        ) : (
          <Link to="/login">
            <button className="Login_btn">Login</button>
          </Link>
        )}

        {isOpen && (
          <div className="dropdown-menu">
            <a href={`profile/myprofile/${user.idUser}`} className="dropdown-item">
              <i className="fa fa-id-card" aria-hidden="true"></i>
              Hồ sơ
            </a>
            <a href="#" className="dropdown-item">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              Tin nhắn
            </a>
            <a href="#" className="dropdown-item">
              <i className="fa fa-cog" aria-hidden="true"></i>
              Tùy chọn
            </a>
            <a href="/login" className="dropdown-item" onClick={logout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Đăng xuất
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
