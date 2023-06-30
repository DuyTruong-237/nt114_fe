import React, { useEffect, useRef } from 'react';
import './MainCourse.css'
import SearchIcon from "../../img/search.png"
import book from  "../../img/book.png"
import education from "../../img/education.png"
import book2 from "../../img/book (2).png"
import book3 from "../../img/book (3).png"
import VideoIntro from "../../video/Intro.mp4"


export default function MainCourse() {

    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          // Xử lý lỗi nếu video không thể phát
          console.log(error);
        });
      }
    }, []);
    
  return (
    <div className='MainCourse'>
        {/* <div className='MainCourse_Title'>
            CÁC KHÓA HỌC: 
        </div>
        <div className='MainCourse_Search'>
            <div className='Searchbar'>
            <input className='Searchbar-input' type='text' placeholder='Tìm kiếm' />
            </div>
            <button className='Searchbox'>
                <img className='Searching' src={SearchIcon} alt="search" />
            </button>
        </div> */}
        <div className="video-container">
            <video ref={videoRef} loop muted>
            <source src={VideoIntro} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      </div>
        {/* <div className='Courses_Wrapper'>
            <div className='Course Gryffindor'>
                <div className='Course_Title'>
                    GRYFFINDOR
                </div>
                <div className='Course_Lecturer'>
                    Gs. Minerva McGonagall
                </div>
                <div className='Course_Icon'>
                    <img className='Icon-img'  src={book} alt="" />
                </div>
            </div>
            <div className='Course Ravenclaw'>
                <div className='Course_Title'>
                    RAVENCLAW
                </div>
                <div className='Course_Lecturer'>
                    Gs. Filius Flitwick
                </div>
                <div className='Course_Icon'>
                    <img className='Icon-img'  src={education} alt="" />
                </div>
            </div>
            <div className='Course Slytherin'>
                <div className='Course_Title'>
                    SLYTHERIN
                </div>
                <div className='Course_Lecturer'>
                    Gs. Severus Snape
                </div>
                <div className='Course_Icon'>
                    <img className='Icon-img'  src={book2} alt="" />
                </div>  
            </div>
            <div className='Course Hufflebuff'>
                <div className='Course_Title'>
                    HUFFLEBUFF
                </div>
                <div className='Course_Lecturer'>
                    Gs. Pomona Sprout
                </div>
                <div className='Course_Icon'>
                    <img className='Icon-img'  src={book3} alt="" />
                </div>  
            </div>
        </div> */}
    </div>
  )
}
