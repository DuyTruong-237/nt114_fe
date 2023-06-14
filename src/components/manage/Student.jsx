import React, { useState, useEffect } from 'react';
import './Manage.css';
import Searchicon from '../../img/search.png';
import Editicon from '../../img/edit.png';
import axios from 'axios';
import AddStudent from '../modal/AddStudent'
export default function Student() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    class: '',
    faculty: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/student/getAllStudent/')
      .then((response) => {
        const students = response.data;
        setStudents(students);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true); // Hiển thị modal khi người dùng nhấp vào nút "Add_btn"
  };

  const closeModal = () => {
    setShowModal(false); // Đóng modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const addStudent = () => {
    axios
      .post('http://localhost:3001/v1/student/addStudent/', newStudent)
      .then((response) => {
        // Xử lý phản hồi từ server khi thêm thành công
        console.log(response.data);

        // Sau khi thêm thành công, đặt lại trạng thái và đóng modal
        setNewStudent({
          id: '',
          name: '',
          class: '',
          faculty: ''
        });
        setShowModal(false);
      })
      .catch((error) => {
        // Xử lý phản hồi từ server khi có lỗi
        console.log(error);
      });
  };

  return (
    <div className="List_Wrapper">
      <div className="List_Header">
        <div>DANH SÁCH SINH VIÊN: </div>
      </div>
      <div className="List_Toolbar">
        <div className="Search_toolbar">
          <input type="text" placeholder='Tìm kiếm'/>
         
          <img className="Search_icon" src={Searchicon} alt="" />
        </div>
        <div>
          <div className="Edit_btn btn">
            <img className="Edit_icon" src={Editicon} alt="" />
          </div>
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
          </tr>
        </thead>
        <tbody className="Manage_Info">
          {students.map((student) => (
            <tr className="Odd" key={student.id}>
              <td>{student.id}</td>
              <td>{student.name || ''}</td>
              <td>{student.acclass_id.name || ''}</td>
              <td>{student.department_id.name || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Modal */}
       {showModal && (
        <AddStudent
          closeModal={closeModal}
          newStudent={newStudent}
          handleChange={handleChange}
          addStudent={addStudent}
        />
      )}
    </div>
  );
}