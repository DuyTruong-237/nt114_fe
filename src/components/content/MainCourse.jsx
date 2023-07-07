import React, { useState, useEffect, useRef } from 'react';
import './MainCourse.css';
import SearchIcon from '../../img/search.png';
import book from '../../img/book.png';
import education from '../../img/education.png';
import book2 from '../../img/book (2).png';
import view from '../../img/book.png';
import book3 from '../../img/book (3).png';
import VideoIntro from '../../video/Intro.mp4';
import uit1 from './uit.jpg'

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
    const scrollThreshold = 200;
  
    if (scrollPosition > scrollThreshold) {
      setIsScrolled(true);
      setIsSloganVisible(false);
      
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
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    const elementToObserve = document.querySelector('.content-section');

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Thực hiện hành động khi phần tử xuất hiện từ dưới lên trên màn hình
          setIsElementVisible(true)
          console.log('Phần tử xuất hiện trên màn hình!');
        }else{
          setIsElementVisible(false)
        }
      });
    };

    const observerOptions = {
      root: null, // Không giới hạn vùng quan sát, sử dụng viewport
      threshold: 0.5, // Ngưỡng để xem là "hiển thị trên màn hình" (50% phần tử hiển thị)
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    // Clean up the observer
    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);
  const [isElementcontent_bodyVisible, setIsElementcontent_bodyVisible] = useState(false);

  useEffect(() => {
    const elementToObserve = document.querySelector('.content-body');

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >=0) {
          // Thực hiện hành động khi phần tử xuất hiện từ dưới lên trên màn hình
          setIsElementcontent_bodyVisible(true)
          console.log('Phần tử xuất hiện trên màn hình!');
        }else{
          setIsElementcontent_bodyVisible(false)
        }
      });
    };

    const observerOptions = {
      root: null, // Không giới hạn vùng quan sát, sử dụng viewport
      threshold: 0.5, // Ngưỡng để xem là "hiển thị trên màn hình" (50% phần tử hiển thị)
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    // Clean up the observer
    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);
  return (
    <div className="MainCourse">
      <div className="video-container">
        <video ref={videoRef} loop muted>
          <source src={VideoIntro} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div   id="naviObject_Home-id" className={`naviObject_Home ${isNavVisible ? 'open' : ''} ${isElementVisible ? 'scrolled' : ''} ${isElementcontent_bodyVisible? 'scrolled2' : ''}` }>
        <div className={`navigation_Home ${isSloganVisible ? 'visible' : ''}`}>
        
          <div className={`scroll-content ${isScrolled ? 'scrolled_Home' : ''}`}>{contentText}</div>
        </div>
      </div>
    <div className='body-main'>
      <div className="content-wrapper">
        <div className="content-section">
          <p>ABOUT UIT</p>
          <p className='content-info'> Providing high quality human resources for Vietnam’s labor market and to serve community’s purposes,The leading university in advanced research and technology transfer in ICT and related fields</p>
        </div>
        <div className="content-body">
        
          <div className='MISSION '>
            <div className='Mission-title'>MISSION</div>
            <div className='triangle-right'></div></div>
            <div className='Mission-body'>
            <img className='img-misson' src={uit1}/>
          <p className='content-info2'>Being a prestigious name in quality education for industrial innovation of ICT and other related fields in Asian.
          <br/><br/>
          In line with training, scientific research are in UIT’s utmost attention and highlighted as the top of all other activities. The focal point concentrates on Information Security, Internet of Things, Artificial Intelligence, Data Sciences and Circuit Design (VLSI Design). Besides, other research fields are being invested and promoted such as E-Commerce, Knowledge Engineering, Multimedia Processing, and Information Systems, Software Engineering. National and international conferences hosted by UIT have become a forum for IT scientists to exchange their ideas and collaborate to carry out research on mutual interest issues.</p>

        </div>
        <div className='tlgd'>
          <div>Exquisite<div className='tlgd-content'>The motto also helps mapping UIT as the top university in IT field in Vietnam, and the place for its students to be catered in all aspects</div></div>
          <div>Innovation<div className='tlgd-content'>The motto also helps mapping UIT as the top university in IT field in Vietnam, and the place for its students to be catered in all aspects</div></div>
          <div>Enthusiasm<div className='tlgd-content'>The motto also helps mapping UIT as the top university in IT field in Vietnam, and the place for its students to be catered in all aspects</div></div>
         
        </div>
        <div className='qert'></div>
        </div>
      </div>
      </div>
    </div>
  );
}
