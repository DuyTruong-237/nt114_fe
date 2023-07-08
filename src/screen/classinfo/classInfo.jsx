import React,  { useState, useEffect } from 'react'
import './classInfo.css'
import mainlogo from './mainlogo.png'
import axios from '../../redux/axios-interceptor';
import { useParams } from 'react-router-dom';
import AddFileUpload from '../../components/modal/AddFileUpload';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import Searchicon from '../../img/search.png';
import Logo from '../../img/mainlogo.png';
import * as xlsx from 'xlsx';

export default function ClassInfo () {
  const user= useSelector((state)=> state.login?.currentUser);

    const [files, setFiles] = useState([])
    const [Class, setClass] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {classID} = useParams();

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [subclassStudents,setSubclassStudents] = useState([]);
    useEffect(() => {
        axios
          .get('http://localhost:3001/v1/uploadfile/getFile/'+classID)
          .then((response) => {
            const files = response.data;
            console.log(files)
            setFiles(files);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      useEffect(() => {
        axios
          .get('http://localhost:3001/v1/abc/getID/subjectclass/'+classID)
          .then((response) => {
            const clss = response.data;
            setClass(clss);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      function FileClick(nameFile) {
        axios
          .get('http://localhost:3001/v1/uploadfile/download/' + nameFile, {
            responseType: 'blob' // Xác định kiểu dữ liệu phản hồi là blob
          })
          .then((response) => {
            const url = URL.createObjectURL(response.data);
      
            const a = document.createElement('a');
            a.href = url;
            a.download = nameFile;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
      
            URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error(error);
            // Xử lý lỗi tại đây...
          });
      }

      useEffect(() => {
        axios
          .get('http://localhost:3001/v1/core/getCoreIDClass/'+classID)
          .then((response) => {
            const subclassStudentsList = response.data;
            setSubclassStudents(subclassStudentsList);
            setFilteredStudents(subclassStudentsList);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [classID]);

      const handleAddFromExcelClick = () => {
        document.getElementById('fileInput').click();
      };
    
      const handleAddScoreByExcel = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });
      
          // Đọc sheet đầu tiên trong workbook
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
          // Chuyển đổi dữ liệu từ sheet thành mảng các đối tượng sinh viên
          const jsonData = xlsx.utils.sheet_to_json(worksheet);
      
          // Lặp qua từng sinh viên trong mảng jsonData
          jsonData.forEach((student) => {
            const studentId = student['Mã số sinh viên'];
            const studentName = student['Họ và tên'];
            const process = student['Quá trình'];
            const practice = student['Thực hành'];
            const midterm = student['Giữa kì'];
            const endterm = student['Cuối kì'];
      
            // Tìm sinh viên trong danh sách subclassStudents dựa trên studentId
            const foundStudent = subclassStudents.find((subStudent) => ((subStudent.student_id?.id === studentId) || (subStudent.student_id?.name === studentName)));
      
            if (foundStudent) {
              // Cập nhật điểm cho sinh viên tìm thấy
              const updatedStudent = {
                ...foundStudent,
                process: Number(process),
                practice: Number(practice),
                midterm: Number(midterm),
                endterm: Number(endterm),
              };
              console.log(foundStudent)
              console.log(updatedStudent)
              // Gọi API để cập nhật điểm của sinh viên
              
              axios
                .put(`http://localhost:3001/v1/core/updateCore/${foundStudent._id}`, updatedStudent)
                .then((response) => {
                  console.log(response.data);
                  // Cập nhật danh sách subclassStudents sau khi cập nhật thành công
                  const updatedStudents = subclassStudents.map((subStudent) =>
                    subStudent._id === foundStudent._id ? updatedStudent : subStudent
                  );
                  setSubclassStudents(updatedStudents);
                  setFilteredStudents(updatedStudents);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        };
      
        if (file) {
          reader.readAsArrayBuffer(file);
        }
      };
      
      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch();
      };
    
      const handleSearch = () => {
        const filtered = subclassStudents.filter((student) => {
          return (
            student.student_id?.id.includes(searchTerm) ||
            student.student_id?.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredStudents(filtered);
      };

      // Modal Handle Area

      const handleFileUpload = (formData) => { // Hàm để xử lý thêm file
        formData.append('subclass',classID)
        formData.append('type',1)
        formData.append('creater_id',user._id )
        axios
          .post('http://localhost:3001/v1/uploadfile/addfile', formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      // End of Modal Area
return (
<div className='classInfo-Background'>
  <div className='title-logo'>
    <img className='logoCourse' src={mainlogo}/>
    <div className='classInfo-title'>Courses</div>
  </div>
  <div className='classInfo-classname'>{Class.subclass_id+" - "+Class.subname||""}</div>
  <hr/>
  
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
  <div id="section-1" className="ClassDetail_Content" role="region" >
      <div className='header-doc'>  
        <div style={{fontSize :"20px", fontWeight:"600"}} >   Tài liệu môn học</div> 
        {
          user?.position=="lecturer"?  <div className="Add_btn btn" onClick={openModal}>
          + Add
      </div> :""
        }
       </div>
      {files.map((file)=>(
        <><h3 className="Content-title">
        {file.title || ""}
    </h3>
        <ul className="List-content">
    
          <li className="List-item" onClick={() => FileClick(file.URL)} >
              <a class="Item-title" >
              <img src="https://courses.uit.edu.vn/theme/image.php/classic/quiz/1667485444/icon"
              class="iconlarge activityicon" alt=""/>
            {file?.URL || ""}
              </a>
          </li>
          {/* <li className="List-item">
              <a class="Item-title" href="https://courses.uit.edu.vn/mod/assign/view.php?id=114608">
              <img src="https://courses.uit.edu.vn/theme/image.php/classic/assign/1667485444/icon"
              class="activityicon" alt=""/>
              Nộp bài tập ôn tập chương 1
              </a>
          </li> */}
         </ul></>
      ))}
      
  </div> 
  <div id="section-2" className="ClassDetail_Content" role="region" >
    <div className="List_Header">
      <div>DANH SÁCH SINH VIÊN:</div>
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
      <div className="AddFromExcel_btn btn" onClick={handleAddFromExcelClick}>
        + Add score from Excel
      </div>
      <input
        id="fileInput"
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={handleAddScoreByExcel}
      />
    </div>
    <table style={{width: "100%", marginTop: "10px"}}>
        <thead className="List_Title">
          <tr>
            <th>
              <b>ID</b>
            </th>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Process</b>
            </th>
            <th>
              <b>Practice</b>
            </th>
            <th>
              <b>Midterm</b>
            </th>
            <th>
              <b>Endterm</b>
            </th>
            <th>
              <b>Average</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
        {
          subclassStudents? <>{filteredStudents.map((subStudent) => (
            <tr
              className="Odd"
              key={subStudent.student_id?.id}
            >
              <td className="studentId">{subStudent.student_id?.id}</td>
              <td>{subStudent.student_id?.name || ''}</td>
              <td>{subStudent.process || ''}</td>
              <td>{subStudent.practice || ''}</td>
              <td>{subStudent.midterm || ''}</td>
              <td>{subStudent.endterm || ''}</td>
              <td>{subStudent.medium || ''}</td>
            </tr>
          ))}</>:<><div className="loading-spinner">
          <div className="loader-container">
            <div className="loader">
              <Oval type="Oval" color= "#FF7B54" height={80} width={80} />
              <img src={Logo} alt="Loading" className="logo-image" />
            </div>
          </div>
        </div></>
        }
          
        </tbody>
      </table>
  </div>

  {isModalOpen && (
    <AddFileUpload 
    closeModal={closeModal} 
    handleFileUpload={handleFileUpload} />
  )}
</div>
    )
  }

