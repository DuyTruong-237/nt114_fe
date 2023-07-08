import React, { useState, useEffect } from 'react';
import "./ClassDetail.css"
import {Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../redux/axios-interceptor';
import TopHeader from '../../components/top_header/TopHeader';
import AddClass from '../modal/AddClass';
import UpdateClass from '../modal/UpdateClass';
import { Oval } from 'react-loader-spinner';
import Logo from '../../img/mainlogo.png'
import Searchicon from '../../img/search.png';
import Editicon from '../../img/edit.png'
import logo from './mainlogo.png'
import { useSelector } from 'react-redux';
import view from './uit1.jpg'
export default function ClassDetails() {
  const user= useSelector((state)=> state.login?.currentUser);
    const [classes, setClasses] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [istitOpen, setIsTitOpen] = useState(false);
    const [student, setStudent] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newClass, setNewClass] = useState({});
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
        .get(URL2 + student._id)
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
      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(); // Tự động lọc danh sách khi người dùng nhập giá trị
      };
    
      const handleSearch = () => {
        const filtered = classes.filter((classes) =>
          classes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClasses(filtered);
      };
      const handleRowClick = (classId) => {
        navigate(`/classInfo/${classId}`);
      };


      const handleAddButtonClick = () => {
        setShowAddModal(true); // Hiển thị modal khi người dùng nhấp vào nút "Add_btn"
      };
    
      const closeAddModal = () => {
        window.location.reload();
        setShowAddModal(false); // Đóng modal
      };
    
      const handleUpdateButtonClick = (classes) => {
        setSelectedClass(classes);
        setShowUpdateModal(true);
      };
    
      const closeUpdateModal = () => {
          window.location.reload();
          setShowUpdateModal(false);
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClass((prevClass) => ({
          ...prevClass,
          [name]: value
        }));
      };
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        axios
          .get('http://localhost:3001/v1/subclass/getAllSubClass')
          .then((response) => {
            const classes = response.data;
            
            setClasses(classes);
            setFilteredClasses(classes);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      const addClass = () => {
        console.log(newClass)
        axios
          .post('http://localhost:3001/v1/subclass/addSubClass', newClass)
          .then((response) => {
            // Xử lý phản hồi từ server khi thêm thành công
            console.log(response.data);
    
            // Sau khi thêm thành công, đặt lại trạng thái và đóng modal
            setNewClass({
              id: '',
              subclass_id: '',
              subname: '', 
              lecturer_id: ''
            });
            setShowAddModal(false);
            window.location.reload();
          })
          .catch((error) => {
            // Xử lý phản hồi từ server khi có lỗi
            console.log(error);
          });
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
      const updateClassDetails = () => {
        axios
          .put(
            `http://localhost:3001/v1/subclass/updateSubClass/${selectedClass.subclass_id}`,
            selectedClass
          )
          .then((response) => {
            // Xử lý phản hồi từ server khi cập nhật thành công
            console.log(response.data);
    
            // Sau khi cập nhật thành công, đặt lại trạng thái và đóng modal
            setSelectedClass(null);
            setShowUpdateModal(false);
          })
          .catch((error) => {
            // Xử lý phản hồi từ server khi có lỗi
            console.log(error);
          });
      };
      if (loading) {
        return (
          <div className="loading-spinner">
            <div className="loader-container">
              <div className="loader">
                <Oval type="Oval" color= "#FF7B54" height={80} width={80} />
                <img src={Logo} alt="Loading" className="logo-image" />
              </div>
            </div>
          </div>
        );
      }
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
      <> {user.position =="admin"? 
      <>
      
        <div className="List_Wrapper">
       <div className="List_Header">
        <div>DANH SÁCH LỚP: </div>
       </div>
       <div className="List_Toolbar">
        <div className="Search_toolbar">
        <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="Search_btn" onClick={handleSearch}>
            <img className="Search_icon" src={Searchicon} alt="" />
          </button>
        </div>
        <div>
        {user?.position=="admin"? <> 
          <div className="Add_btn btn" onClick={handleAddButtonClick}>
            + Add
          </div></>:""}
        </div>
       </div>
       <table>
        <thead className="List_Title">
          <tr>
            <th >
              <b>ID</b>
            </th>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Term</b>
            </th>
            <th>
              <b>Year</b>
            </th>
            <th>
              <b>Action</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
          {filteredClasses.map((classes) => (
            <tr
              className="Odd"
              key={classes.id}
              onDoubleClick={() => handleRowClick(classes._id)}
            >
              <td className="classId">{classes.subclass_id}</td>
              <td>{classes.subname || ''}</td>
              <td>{classes.term || ''}</td>
              <td>{classes.yearSchool || ''}</td>
              <td>
                <div className="Edit_btn btn" onClick={() => handleUpdateButtonClick(classes)}>
                  <img className="Edit_icon" src={Editicon} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
       </table>

       {/* { Modal } */}
       {showAddModal && (
        <AddClass
          closeAddModal={closeAddModal}
          newClass={newClass}
          handleChange={handleChange}
          addClass={addClass}
        />
       )}

       {showUpdateModal && (
        <UpdateClass
          closeUpdateModal={closeUpdateModal}
          selectedClass={selectedClass}
          // handleChange={(e) => {
          //   const { name, value } = e.target;
          //   setSelectedDepartment((prevDepartment) => ({
          //     ...prevDepartment,
          //     [name]: value
          //   }));
          // }}
          updateClassDetails={updateClassDetails}
        />
       )}  
        </div>
        </>
       :
       <>
       <div className='ClassDetail_body' >
            
            <div className='Header-class'>
            
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
                  <Link to={"/classInfo/"+(user?.position=="lecturer"? classes._id:classes.subject_class?._id)}><div className='courser-item' ><h1 className="ClassDetail_Header"><strong>{user?.position=="lecturer"? classes?.subname:  classes.subject_class?.subname||""} - {user?.position=="lecturer"? classes?.subclass_id:  classes.subject_class?.subclass_id||""}</strong></h1></div></Link>
                    
                    
                </div>
            ))}
            </div>
            </div>
           
            
            
             </div>
            
        </div>
      </>}</>
     
        
        
        
        
         
    );
}