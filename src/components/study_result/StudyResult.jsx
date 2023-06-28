
import './StudyResult.css';
import axios from '../../redux/axios-interceptor'
import '@fortawesome/fontawesome-svg-core/styles.css';
import React,  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function StudyResult () {
    const user= useSelector((state)=> state.login?.currentUser);
    const [newData, setNewData] = useState([]);
    const [student, setStudent] = useState([]);
    const { id, role } = useParams();
    let id_student;
    let n=0;
    let cre=0,tb=0;
    let prevProcess = null;
    
        useEffect(() => {
            axios
              .get('http://localhost:3001/v1/student/getStudentID/' + user.idUser)
              .then((response) => {
                const newData = response.data;
                console.log(newData);
                setStudent(newData);
              })
              .catch((error) => {
                console.log(error);
              });
          }, []);
          if(role=="myresult")
    {
          id_student=student._id
    }else{
        id_student=id
    }
   
    
    useEffect(() => {
      if (student._id) {
        axios
          .get('http://localhost:3001/v1/abc/getInfoByID/core/' + id_student)
          .then((response) => {
            const newData = response.data;
            console.log(newData);
            setNewData(newData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, [student]);
   
    return (
        <div className="Study_Result_wrapper">
            {/* Header */}
            <center className="Title" >
                <h3>
                    <strong>
                        BẢNG ĐIỂM SINH VIÊN
                    </strong>
                </h3>
            </center>

            {/* Student Profile Table */}
            <table className="Student_Profile_Table">
                <caption><strong>Thông tin sinh viên</strong></caption>
                <tbody>
                    <tr>
                        <td>Họ và tên:</td>
                        <td><strong>Lê Thanh Thảo Vy</strong></td>
                        <td>Ngày sinh:</td>
                        <td><strong>09-04-2002</strong></td>
                        <td>Giới tính:</td>
                        <td><strong>Nữ</strong></td>
                    </tr>
                    <tr>
                        <td>Mã SV: </td>
                        <td><strong>20522178</strong></td>
                        <td>Lớp sinh hoạt: </td>
                        <td><strong>MMCL2020</strong></td>
                        <td>Khoa</td>
                        <td><strong>MMT&TT</strong></td>
                    </tr>
                    <tr>
                        <td>Bậc đào tạo: </td>
                        <td><strong>Đại học</strong></td>
                        <td>Hệ đào tạo: </td>
                        <td colSpan={3}><strong>CLC</strong></td>
                    </tr>
                </tbody>
            </table>

            {/* Student Result */}
            <table className="Student_Result_Table">
                <caption><strong>Bảng điểm</strong></caption>
                <tbody>
                    <tr>
                        <th colSpan={1} ></th>
                        <th>Mã HP</th>
                        <th>Tên học phần</th>
                        <th>Tín chỉ</th>
                        <th>Điểm QT</th>
                        <th>Điểm GK</th>
                        <th>Điểm TH</th>
                        <th>Điểm CK</th>
                        <th>Điểm HP</th>
                        <th>Ghi chú</th>
                    </tr>
                   
                   
  
    {newData.map((data) => {
        
      if (data.subject_class.term !== prevProcess) {
        let crev=cre,tbv=tb;
        let f=0
        if(f!=prevProcess){
             f=prevProcess;
            cre=0;
            tb=0
        }
       
        prevProcess = data.subject_class.term;
       
         cre=cre + data.subject_id?.cre||0;
         tb=tb + data.medium* data.subject_id?.cre||0
         
        return( <>
        {f===1||f===2||f===3? <><tr>
                        <td></td>
                        <td></td>
                        <td><strong>Trung bình học kỳ</strong></td>
                        <td><strong>{crev}</strong></td>
                        <td></td>
                        <td title></td>
                        <td></td>
                        <td></td>
                        <td><strong>{tbv/crev}</strong></td>
                        <td></td>
                    </tr></>: ""
                    
                    

        }
          
            <td colSpan={10} style={{background:"white"}}><center><b>Học kỳ {data.subject_class.term} - Năm học 2020-2021</b></center></td> 
            
            <br/>
            <tr key={data.id}>
              <td>{n+=1}</td>
              <td>{data.subject_id?.subject_id||""}</td>
              <td>{data.subject_id?.name||""}</td>
              <td>{data.subject_id?.cre||""}</td>
              <td>{data.process||""}</td>
              <td title>{data.midterm||""}</td>
              <td>{data.practice||""}</td>
              <td>{data.endterm||""}</td>
              <td>{data.medium||""}</td>
              <td>{/* Additional column content */}</td>
            </tr>
           
          </>)
           
      } else {
        cre=cre + data.subject_id?.cre||0;
        tb=tb + data.medium* data.subject_id?.cre||0
        return(
            <>
            <tr key={data.id}>
              <td>{n+=1}</td>
              <td>{data.subject_id?.subject_id||""}</td>
              <td>{data.subject_id?.name||""}</td>
              <td>{data.subject_id?.cre||""}</td>
              <td>{data.process||""}</td>
              <td title>{data.midterm||""}</td>
              <td>{data.practice||""}</td>
              <td>{data.endterm||""}</td>
              <td>{data.medium||""}</td>
              <td>{/* Additional column content */}</td>
            </tr>
            
          </>
        )
       
       
        
        
      }
    })}
 <tr>
                        <td></td>
                        <td></td>
                        <td><strong>Trung bình học kỳ</strong></td>
                        <td><strong>{cre}</strong></td>
                        <td></td>
                        <td title></td>
                        <td></td>
                        <td></td>
                        <td><strong>{tb/cre}</strong></td>
                        <td></td>
                    </tr>: ""
                   
                        
                  
                   
                    
                   
                </tbody>
            </table>
        </div>
    )
}
