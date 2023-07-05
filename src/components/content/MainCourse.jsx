import React, { useState, useEffect, useRef } from 'react';
import './MainCourse.css';
import SearchIcon from '../../img/search.png';
import book from '../../img/book.png';
import education from '../../img/education.png';
import book2 from '../../img/book (2).png';
import view from '../../img/book.png';
import book3 from '../../img/book (3).png';
import VideoIntro from '../../video/Intro.mp4';

export default function MainCourse() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contentText, setContentText] = useState(false);
  const [isSloganVisible, setIsSloganVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const elementToObserve = document.querySelector('.naviObject_Home');
    const observer = new IntersectionObserver((entries, observe) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsNavVisible(false);
          console.log('Navigation is visible on the screen!');
        } else {
          setIsNavVisible(true);
        }
      });
    });

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 400;
  
    if (scrollPosition > scrollThreshold) {
      setIsScrolled(true);
      setIsSloganVisible(false);
      const contentSection = document.querySelector('.content-section p');
      setContentText(contentSection.textContent);
    } else {
      setIsScrolled(false);
      setIsSloganVisible(true);
      setContentText('');
    }
  };
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <div className="MainCourse">
      <div className="video-container">
        <video ref={videoRef} loop muted>
          <source src={VideoIntro} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div   id="naviObject_Home-id" className={`naviObject_Home ${isNavVisible ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}` }>
        <div className="navigation_Home">
          <div className={`slogan_message ${isSloganVisible ? 'visible' : ''}`}>
            Chọn UIT
            <br />
            Chọn để thành công
          </div>
          <div className={`scroll-content ${isScrolled ? 'scrolled_Home' : ''}`}>{contentText}</div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="content-section">
          <p>ABOUT UIT</p>
        </div>
      </div>
    </div>
  );
}
