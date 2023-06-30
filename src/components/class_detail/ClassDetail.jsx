import React, { useState, useEffect } from 'react';
import "./ClassDetail.css"
import { Link } from 'react-router-dom';
import axios from '../../redux/axios-interceptor';
import TopHeader from '../../components/top_header/TopHeader';
import logo from './mainlogo.png'
import view from './uit1.jpg'
export default function ClassDetails() {
    const [classes, setClasses] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    useEffect(() => {
        axios
        .get('http://localhost:3001/v1/abc/getAll/subjectclass')
        .then(response => {
            const classes = response.data;
            setClasses(classes);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        const viewClass = document.querySelector('.naviObject ');
        if (viewClass) {
          viewClass.classList.add('open');
        }
      }, []);
      const handleWheel = (e) => {
        if (e.deltaY > 0) {
          setIsNavOpen(false);
        } else if (e.deltaY < 0) {
          setIsNavOpen(true);
        }
      };
      useEffect(() => {
        const handleMouseOut = (e) => {
          const mousePosX = e.clientX;
    
          if (mousePosX < window.innerWidth ) {
            setIsNavOpen(false);
          }
        };
    
        document.addEventListener('mouseout', handleMouseOut);
    
        return () => {
          document.removeEventListener('mouseout', handleMouseOut);
        };
      }, []);
    
    return (
        <div className='ClassDetail_body' onWheel={handleWheel}>
            
            <div className='Header-class'>
        <TopHeader/>
      </div>
            <div className='view-class'>
           
                <img className='view-item' src={view}/>
            <div class="overlay"></div>
            </div>
            <div className={`naviObject ${isNavOpen ? 'open' : ''}`}>
                 <div class="navigation">
                <div className='slogan_message'>“Success is the progressive realization of a worthy goal.”</div> 
               </div>
           </div>
           
           <div className='groub-contentView'>
            <div className='contentView'>
                <div className='class-item'>
                    <div  className='class-logo-courses'><img src={logo}/></div>
                    <div className='class-title'> Courses</div>
                   
                </div>
                <div className='class-list-courses'>
              {classes.map(classes => (
                <div className="ClassDetail_wrapper">
                    <h1 className="ClassDetail_Header"><strong>{classes.subname} - {classes.subclass_id}</strong></h1>
                    <div id="section-0" className="ClassDetail_Content" role="region" style={{background:"#9dd2f1"}}>
                        <ul className="List-content">
                            <li className="List-item">
                            <a class="Item-title" href="https://courses.uit.edu.vn/mod/forum/view.php?id=157905">
                                <img src="https://courses.uit.edu.vn/theme/image.php/classic/forum/1667485444/icon" 
                                class="activityicon" alt=""
                                />
                                Các thông báo
                            </a>
                            </li>
                        </ul>              
                    </div>
                    <div id="section-1" className="ClassDetail_Content" role="region" style={{background:"#9dd2f1"}}>
                        <h3 className="Content-title">
                                    Chủ đề 1
                                </h3>
                            <ul className="List-content">
                                
                                <li className="List-item">
                                    <a class="Item-title" href="https://courses.uit.edu.vn/mod/quiz/view.php?id=116233">
                                    <img src="https://courses.uit.edu.vn/theme/image.php/classic/quiz/1667485444/icon"
                                    class="iconlarge activityicon" alt=""/>
                                    Bài kiểm tra đầu khóa
                                    </a>
                                </li>
                                <li className="List-item">
                                    <a class="Item-title" href="https://courses.uit.edu.vn/mod/assign/view.php?id=114608">
                                    <img src="https://courses.uit.edu.vn/theme/image.php/classic/assign/1667485444/icon"
                                    class="activityicon" alt=""/>
                                    Nộp bài tập ôn tập chương 1
                                    </a>
                                </li>
                            </ul>
                    </div>
                </div>
            ))}
            </div>
            </div>
             </div>
            
        </div>
        
        
        
         
    );
}