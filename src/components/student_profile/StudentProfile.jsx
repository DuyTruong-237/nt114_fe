import React, {useState, useEffect} from 'react'
import './StudentProfile.css';
import { Navigate, useNavigate } from 'react-router-dom';
import avatar from '../../img/user.png';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../redux/axios-interceptor';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

export default function StudentProfile() {
  let url;
  const { id, role } = useParams();
  const user= useSelector((state)=> state.login?.currentUser);
  const [student, setStudent] = useState(null);
  const [subjects, setSubject] = useState([]);
  const [editable, setEditable] = useState(false); // Thêm state để theo dõi chế độ chỉnh sửa
  let mainavatar="";
  const [data, setData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    if(editable)
    {
    const url = role === 'lecturer'||user.position==="lecturer" ? `http://localhost:3001/v1/lecturer/updateLecturer/${student._id}` : `http://localhost:3001/v1/student/updateStudent/${student._id}`;
    axios
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });}
  };

  if (role == "student" ) {
    url = `http://localhost:3001/v1/student/getStudent/`;
  }
  else if(role == "myprofile"){
   
    if(user?.position=="student")
    
    url = `http://localhost:3001/v1/student/getStudentID/`;
    else  if(user?.position=="lecturer")
    url = `http://localhost:3001/v1/lecturer/getLecturerID/`;
  }
  else {
    url = 'http://localhost:3001/v1/lecturer/getLecturer/';
  }
  const handleEdit = () => {
    setEditable(!editable); // Khi bấm vào nút "Tùy chỉnh", cập nhật trạng thái "editable" ngược lại với giá trị hiện tại
  };
  useEffect(() => {
    axios
      .get(url+ id)
      .then((response) => {
        const studentData = response.data;
        mainavatar= "http://localhost:3001/uploads/"+studentData.id;
        console.log(studentData)
        setStudent(studentData);
        axios
      .get("http://localhost:3001/v1/sublec/getSubLecID/lecturer_id/"+ studentData._id)
      .then((response) => {
        const studentData = response.data;
      
        console.log(mainavatar)
        setSubject(studentData);
      })
      .catch((error) => {
        console.log(error);
      });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    
  }, [id]);
  
const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post('http://localhost:3001/v1/user/updateUser/'+student.id, formData, {
       
      });
      
      
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (!student) {
    return <div>Loading...</div>;
  }

  return (

    <div className='Profile_wrapper'>
        <div className='Title'>THÔNG TIN {user?.position=="student"? "SINH VIÊN" : "GIẢNG VIÊN" }</div>
        <div className='Student_wrapper' {...getRootProps()}>
            <img  className='Avatar_Profile' src={"http://localhost:3001/uploads/"+student.idUser} alt="Avatar Profile"/>
          <div {...getInputProps()}></div>
            <div className='Name_ID_wrapper'>
                <div className='Student_name'>{student.name}</div>
                <div className='Student_ID'>{student.id} |{role=="myprofile"? (user?.position=="student"? "Sinh viên":"Giảng viên"):(role=="student"? "Sinh viên":"Giảng viên")} {}</div>
            </div> 
        </div>
        <div className='Info_Wrapper'>
          <div className='Edit_btn_profile_wrapper'>
          <div className='Edit_btn_profile btn_radius' onClick={handleEdit}>
            <Link to={ `/learning-result/iresult/${student._id}`}><button>Bảng điểm</button></Link>
           
          </div>
          <div className='Edit_btn_profile btn_radius' onClick={handleEdit}>
           
            <b onClick={handleUpdate}>{editable ? 'Lưu' : 'Tùy chỉnh'}</b>
          </div>
        </div>
          <div className='Info_Profile'>
            <div className='Text_Info_first'>Họ và tên: {student.name || null} </div>
            <div className='Text_Info'>Giới tính: {student.sex || null} </div>
            <div className='Text_Info'>Ngày, tháng, năm sinh: {student.dob || null} </div>
            <div className='Text_Info'>Email: {student.email || null} </div>
            <div className='Text_Info'>Điện thoại: {student.phone_num || null} </div>
            <div className='Text_Info'>Khoa: {student.department_id?.name || null} </div>
            <div className='Text_Info'>Ngành học: {student.major|| null}</div>
            <div className='Text_Info'>Lớp học: {student.acclass_id?.name || null}</div>
            <div className='Text_Info_final'> Địa chỉ tạm trú: {student.address || null}<br></br>
            <label> 
                <input type="checkbox" disabled={!editable}></input>
                <span class="checkmark"></span>
                Ký túc xá ĐHQG - HCM<br></br>
            </label>
            <label>
                <input type="checkbox" disabled={!editable}></input >
                <span class="checkmark"></span>
                Khác
            </label>
            <div className='Info_Bar_Wrapper'>
              <div className='basic-info'>
              <div className='Info_Bar'>
                Nơi sinh: <br></br>
                <input className='Infobar-input' type='text' name="address"
              value={student.address}
              onChange={handleChange} readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                CMND/CCCD: <br></br>
                <input className='Infobar-input' type='text' name="CI"
              value={student.CI}
              onChange={handleChange} readOnly={!editable}/>
              </div><div className='Info_Bar'>
                Ngày cấp CMND/CCCD:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Nơi cấp CMND/CCCD:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Dân tộc:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Tôn giáo:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Thông tin ngân hàng:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Số tài khoản:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div>
              <div className='Info_Bar'>
                Chi nhánh:<br></br>
                <input className='Infobar-input' type='text' readOnly={!editable}/>
              </div> 
              </div>
              <div className='subject-list-lec'>
                {user?.position=="lecturer"? <> <h4>Các môn học giảng dạy</h4>
                <div className='lec-sublist'>
                  {subjects.map((subject)=>(<div className='lec-sublist-row'>{subject?.subject_id?.subject_id ||""} - { subject?.subject_id?.name||""}</div>))}
                </div></>:""}
               
                </div> 
            </div>                                                                                         
          </div>
        </div>
      </div>
    </div>
  )
}
