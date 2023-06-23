import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Manage.css';
import { Oval } from 'react-loader-spinner';
import Searchicon from '../../img/search.png';
import Logo from '../../img/mainlogo.png'
import Editicon from '../../img/edit.png';
import axios from '../../redux/axios-interceptor';
import AddStudent from '../modal/AddStudent';
import UpdateSubject from '../modal/UpdateSubject';




export default function Student() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // Danh sách sinh viên sau khi lọc
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    acclass_id: '',
    department_id: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

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

  const closeModal = () => {
    window.location.reload();
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
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
        // Update the subjects state with the updated student details
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
        setNewStudent({
          id: '',
          name: '',
          class: '',
          faculty: ''
        });
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
  handleSearch(); // Tự động lọc danh sách khi người dùng nhập giá trị
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
 
  return (
    <div className="List_Wrapper">
      <div className="List_Header">
        <div>DANH SÁCH SINH VIÊN: </div>
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
          {filteredStudents.map((student) => (
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
          ))}
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
        <UpdateSubject
          closeUpdateModal={closeUpdateModal}
          selectedStudent={selectedStudent}
          updateStudentDetails={updateStudentDetails}
      />           
      )}
    </div>
  );

  
}
