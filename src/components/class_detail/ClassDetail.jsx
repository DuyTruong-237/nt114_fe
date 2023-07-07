import React, { useState, useEffect } from 'react';
import "./ClassDetail.css"
import {Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../redux/axios-interceptor';
import TopHeader from '../../components/top_header/TopHeader';
import logo from './mainlogo.png'
import { useSelector } from 'react-redux';
import view from './uit1.jpg'
export default function ClassDetails() {
  const user= useSelector((state)=> state.login?.currentUser);
    const [classes, setClasses] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [istitOpen, setIsTitOpen] = useState(false);
    const [student, setStudent] = useState([]);
    let idstudent;
  const navigate = useNavigate();
  let URL,URL2;
  if(user?.position=="student"){
    URL="http://localhost:3001/v1/student/getStudentID/"
    URL2="http://localhost:3001/v1/abc/getInfoByID/core/"
  }else if( user?.position=="lecturer"){
    URL="http://localhost:3001/v1/lecturer/getLecturerID/"
    URL2="http://localhost:3001/v1/subclass/getSubClassIDLec/"
  }else{
    URL="http://localhost:3001/v1/abc/getAll/subjectclass"
  }
  useEffect(() => {
    axios
      .get(URL + user.idUser)
      .then((response) => {
      
        const newData = response.data;
       
        setStudent(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
  useEffect(() => {
    if (student._id) {
      axios
        .get('http://localhost:3001/v1/abc/getInfoByID/core/' + student._id)
        .then((response) => {
          const classes = response.data;
          console.log(classes)
          setClasses(classes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [student]);
    // useEffect(() => {
    //     axios
    //     .get('http://localhost:3001/v1/abc/getInfoByID/core/' + idstudent)
    //     .then(response => {
    //         const classes = response.data;
    //         console.log(classes)
    //         setClasses(classes);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }, []);
    // useEffect(() => {
    //     const viewClass = document.querySelector('.naviObject ');
    //     const viewContent = document.querySelector('.contentView ');
    //     if (viewClass) {
    //       viewClass.classList.add('open');
    //      // viewContent.classList.add('open')
    //     }
    //   }, []);
     
  
    //   useEffect(() => {
    //       axios.get('http://localhost:3001/v1/abc/getAll/subjectclass')
    //       .then(response => {
    //           const classes = response.data;
    //           setClasses(classes);
    //       })
    //       .catch(error => {
    //           console.log(error);
    //       });
    //   }, []);
  
      // useEffect(() => {
      //     const viewClass = document.querySelector('.naviObject');
      //     if (viewClass) {
      //         viewClass.classList.add('open');
      //         setIsNavOpen(true);
      //         console.log('Element is visible on the screen!');
      //     }
      // }, []);
      const handleRowClick = (classId) => {
        navigate(`/classInfo/${classId}`);
      };
      useEffect(() => {
        const elementToObserve = document.querySelector('.naviObject');
    
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsNavOpen(true);
              setIsTitOpen(false)
              console.log('Element is visible on the screen!');
            } else {
              setIsNavOpen(false);
              setIsTitOpen(true)
            }
          });
        });
    
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
//       // const handleWheel = (e) => {
//       //   if (e.deltaY > 80) {
//       //     setIsNavOpen(false);
//       //   } else if (e.deltaY < 80) {
//       //     setIsNavOpen(true);
//       //   }
//       // };
//       // const handleWheeltitle = (e) => {
//       //   if (e.deltaY > 0) {
//       //     setIsTitOpen(false);
//       //   } else if (e.deltaY < 0) {
//       //     setIsTitOpen(true);
//       //   }
//       // };
//       var screenWidth = window.innerWidth;
// var screenHeight = window.innerHeight;


// var elementToObserve = document.querySelector('naviObject');

// // Tạo một instance của Intersection Observer
// var observer = new IntersectionObserver(function(entries, observer) {
//   entries.forEach(function(entry) {
//     if (entry.isIntersecting) {
//       // Thêm class "visible" khi thẻ xuất hiện trên màn hình
//     setIsNavOpen(true)
//       // Thực hiện hành động của bạn khi thẻ xuất hiện
//       console.log('Element is visible on the screen!');
//     } else {
//       // Xóa class "visible" khi thẻ không còn xuất hiện trên màn hình
//      setIsNavOpen(false)
//     }
//   });
// });

// // Bắt đầu quan sát thẻ
// observer.observe(elementToObserve);
//       // useEffect(() => {
//       //   const handleMouseOut = (e) => {
//       //     const mousePosX = e.clientX;
    
//       //     if (mousePosX < 100000 ) {
//       //       setIsNavOpen(true);
//       //       setIsTitOpen(true)
//       //     }
//       //   };
    
//       //   document.addEventListener('mouseout', handleMouseOut);
    
//       //   return () => {
//       //     document.removeEventListener('mouseout', handleMouseOut);
//       //   };
//       // }, []);
    
    return (
        <div className='ClassDetail_body' >
            
            <div className='Header-class'>
        <TopHeader/>
      </div>
            <div className='view-class'>
           
                <img className='view-item' src={view}/>
            <div class="overlay"></div>
            </div>
            <div id="naviObject-id" className={`naviObject ${isNavOpen ? 'open' : ''}`}>
                 <div class="navigation">
                <div className='slogan_message'>“Success is the progressive realization of a worthy goal.”</div> 
               </div>
           </div>
           
           <div className='groub-contentView'>
           
            <div className={`contentView ${istitOpen ? 'open' : ''}`} >
                <div className='class-item'>
                    <div  className='class-logo-courses'><img src={logo}/></div>
                    <div className='class-title'> Courses</div>
                   
                </div>
                
                <div className={`class-list-courses ${istitOpen ? 'open' : ''}`}>
                  <div className='class-cliss'>Class list</div>
              {classes.map(classes => (
                <div className="ClassDetail_wrapper">
                  <Link to={"/classInfo/"+classes.subject_class?._id}><div className='courser-item' ><h1 className="ClassDetail_Header"><strong>{classes.subject_class?.subname||""} -</strong></h1></div></Link>
                    
                    
                </div>
            ))}
            </div>
            </div>
           
            
            
             </div>
            
        </div>
        
        
        
         
    );
}