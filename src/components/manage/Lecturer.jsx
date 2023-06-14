import React, { useState, useEffect } from 'react';
import './Manage.css';
import Searchicon from '../../img/search.png';
import Editicon from '../../img/edit.png';
import axios from 'axios';
import AddLecturer from '../modal/AddLecturer'

export default function Lecturer() {
  const [lecturers, setLecturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLecturer, setNewLecturer] = useState({
    id: '',
    name: '',
    faculty: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/lecturer/getAllLecturer')
      .then((response) => {
        const lecturerData = response.data;
        console.log(lecturerData);
        setLecturers(lecturerData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewLecturer({
      id: '',
      name: '',
      faculty: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewLecturer((prevLecturer) => ({
      ...prevLecturer,
      [name]: value,
    }));
  };

  const addLecturer = () => {
    axios
      .post('http://localhost:3001/v1/lecturer/addLecturer', newLecturer)
      .then((response) => {
        console.log(response.data);
        setNewLecturer({
          id: '',
          name: '',
          faculty: ''
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
    };

  return (
    <div className="List_Wrapper">
      <div className="List_Header">
        <div>DANH SÁCH GIẢNG VIÊN:</div>
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
              <b>Falculty</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
          {lecturers.map((lecturer) => (
            <tr className="Odd" key={lecturer.id}>
              <td>{lecturer.id}</td>
              <td>{lecturer.name}</td>
              <td>{lecturer.department_id.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <AddLecturer
          closeModal={closeModal}
          newLecturer={newLecturer}
          handleChange={handleChange}
          addLecturer={addLecturer}
        />
      )}
    </div>
  );
}
