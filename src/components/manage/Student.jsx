import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Manage.css';
import { Oval } from 'react-loader-spinner';
import Searchicon from '../../img/search.png';
import Logo from '../../img/mainlogo.png';
import Editicon from '../../img/edit.png';
import axios from '../../redux/axios-interceptor';
import AddStudent from '../modal/AddStudent';
import UpdateSubject from '../modal/UpdateSubject';
import UpdateLecAndStu from '../modal/UpdateLecAndStu';
import * as xlsx from 'xlsx';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    acclass_id: null,
    department_id: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataAcclass, setDataAcclass] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ validStudents: [], invalidStudents: [] });

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/abc/getAll/department')
      .then((response) => {
        const dataSelect = response.data;
        setDataDepartment(dataSelect);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3001/v1/abc/getAll/acclass')
      .then((response) => {
        const dataAcclass = response.data;
        setDataAcclass(dataAcclass);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/student/getAllStudent/')
      .then((response) => {
        const students = response.data;
        setStudents(students);
        setFilteredStudents(students);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleAddFromExcelClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });

      // Đọc sheet đầu tiên trong workbook
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

       // Chuyển đổi dữ liệu từ sheet thành mảng các đối tượng sinh viên
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
      console.log(jsonData)
      // Thêm sinh viên vào danh sách
      const newStudents = jsonData.map((student) => ({
        name: student['Họ và tên'],
        department_id: student['Khoa'],
        acclass_id: student['Lớp'],
        CI: student['CCCD'],
        sex: student['Giới tính'],
        address: student['Địa chỉ'],
        email: student['Email'],
        phone_num: student['Số điện thoại']
      }));
     
       // Tạo mảng để chứa các sinh viên đúng
    const validStudents = [];
    // Tạo mảng để chứa các sinh viên sai
    const invalidStudents = [];

    // Lặp qua từng sinh viên trong mảng jsonData
    jsonData.forEach((student) => {
      const departmentId = student['Khoa'];
      const acclassId = student['Lớp'];
      const CI = student['CCCD'];
      const sex =  student['Giới tính'];
      const address =  student['Địa chỉ'];
      const email =  student['Email'];
      const phone_num = student['Số điện thoại'];

      // Kiểm tra giá trị departmentId và acclassId
      const departmentExists = dataDepartment.some((department) => department._id === departmentId);
      const acclassExists = dataAcclass.some((acclass) => acclass._id === acclassId);
      if (departmentExists && acclassExists) {
        validStudents.push({
          name: student['Họ và tên'],
          department_id: departmentId,
          acclass_id: acclassId,
          CI:CI,
          sex: sex,
          address: address,
          email: email,
          phone_num:phone_num
        });
      } else {
        invalidStudents.push({
          name: student['Họ và tên'],
          department_id: departmentId,
          acclass_id: acclassId,
          CI:CI,
          sex: sex,
          address: address,
          email: email,
          phone_num:phone_num
        });
      }
    });
      validStudents.map((student)=>{
        console.log(student)
        axios
        .post('http://localhost:3001/v1/student/addStudent/', student)
        .then((response) => {
          console.log(response.data);
          // Cập nhật danh sách sinh viên sau khi thêm thành công

          setStudents([...students, ...newStudents]);
          setFilteredStudents([...students, ...newStudents]);
          setNotificationData({ validStudents, invalidStudents });
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            window.location.reload();
          }, 10000);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      // Gọi API để thêm sinh viên vào cơ sở dữ liệu
      
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const closeModal = () => {
    window.location.reload();
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const closeUpdateModal = () => {
    window.location.reload();
    setShowUpdateModal(false);
  };

  const handleUpdateButtonClick = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const updateStudentDetails = (studentId, updatedDetails) => {
    axios
      .put(`http://localhost:3001/v1/student/${studentId}`, updatedDetails)
      .then((response) => {
        console.log(response.data);
        const updatedStudent = students.map((student) =>
          student.student_id === studentId ? { ...student, ...updatedDetails } : student
        );
        setStudents(updatedStudent);
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudent = () => {
    axios
      .post('http://localhost:3001/v1/student/addStudent/', newStudent)
      .then((response) => {
        console.log(response.data);
       
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const handleRowClick = (studentId) => {
    navigate(`/profile/student/${studentId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch();
  };

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        student.id.includes(searchTerm) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStudents(filtered);
  };

  if (loading) {
    return (
      <div className="loading-spinner" >
        <div className="loader-container">
          <div className="loader">
            <Oval type="Oval" color="#FF7B54" height={80} width={80} />
            <img src={Logo} alt="Loading" className="logo-image" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="List_Wrapper">
      {showNotification && (
        <div className="TempNotification">
          <div className="TempNotification-Content">
            <div className="Valid">
              <div className="TempNotification-Title">Thêm thành công:</div>
              <ul>
                {notificationData.validStudents.map((student, index) => (
                  <li key={index}>{student.name}</li>
                ))}
              </ul>
            </div>
            <div className="Invalid">
              <div className="TempNotification-Title">Thêm thất bại:</div>
              <ul>
                {notificationData.invalidStudents.map((student, index) => (
                  <li key={index}>{student.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="TempNotification-Close" onClick={() => {
            setShowNotification(false)
            window.location.reload();
          }}>
            X
          </div>
        </div>
      )}
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
        <div>
          <div className="AddFromExcel_btn btn" onClick={handleAddFromExcelClick}>
            + Add from Excel
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <div className="Add_btn btn" onClick={handleAddButtonClick}>
            + Add
          </div>
        </div>
      </div>
      <table>
        <thead className="List_Title">
          <tr>
            <th>
              <b>ID</b>
            </th>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Class</b>
            </th>
            <th>
              <b>Falculty</b>
            </th>
            <th>
              <b>Actions</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
        {
          students? <>{filteredStudents.map((student) => (
            <tr
              className="Odd"
              key={student.id}
              onDoubleClick={() => handleRowClick(student._id)}
            >
              <td className="studentId">{student.id}</td>
              <td>{student.name || ''}</td>
              <td>{student.acclass_id?.name || ''}</td>
              <td>{student.department_id?.name || ''}</td>
              <td>
                <div className="Edit_btn btn" onClick={() => handleUpdateButtonClick(student)}>
                  <img className="Edit_icon" src={Editicon} alt="" />
                </div>
              </td>
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

      {showModal && (
        <AddStudent
          closeModal={closeModal}
          newStudent={newStudent}
          handleChange={handleChange}
          addStudent={addStudent}
        />
      )}
      {showUpdateModal && (
        <UpdateLecAndStu
          closeUpdateModal={closeUpdateModal}
          selectedData={selectedStudent}
          updateDataDetails={updateStudentDetails}
          type="student"
        />
      )}
    </div>
  );
}
