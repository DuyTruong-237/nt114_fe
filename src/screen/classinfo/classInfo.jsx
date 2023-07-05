import React,  { useState, useEffect } from 'react'
import './classInfo.css'
import mainlogo from './mainlogo.png'
import axios from '../../redux/axios-interceptor';
import { useParams } from 'react-router-dom';

export default function ClassInfo () {
    const [files, setFiles] = useState([])
    const [Class, setClass] = useState("")
    const {classID} = useParams();
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
        <div>   Tài liệu môn học</div> 
        <div className="Add_btn btn" >
            + Add
          </div>
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
      
  </div> </div>
    )
  }

