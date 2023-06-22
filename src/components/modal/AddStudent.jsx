
import './AddData.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React,  { useState, useEffect } from 'react';
import axios from '../../redux/axios-interceptor'
config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome
export default function AddStudent({
  closeModal,
  newStudent,
  handleChange,
  
}) {
  const [newData, setNewData] = useState([]);
  function addStudent(){
    console.log(newStudent);
    axios
    .post('http://localhost:3001/v1/student/addStudent',newStudent)
    .then((response) => {
      const newData = response.data;
      setNewData(newData)
     
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [dataDepartment, setData] = useState([]);
  const [dataAcclass, setDataClass] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/abc/getAll/department')
      .then((response) => {
        const dataSelect = response.data;
        console.log(dataSelect);
        setData(dataSelect)
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get('http://localhost:3001/v1/abc/getAll/acclass')
      .then((response) => {
        const dataAcclass = response.data;
        setDataClass(dataAcclass)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div className="modal">
        <div className="modal-header">
          <span className="close" onClick={closeModal}>
            <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}} />
          </span>
          <h2>Add Student</h2>
        </div>
      <div className="modal-content">
        {/* Nội dung của modal */}

        {/* <label>Mã số sinh viên</label>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={newStudent.id}
          onChange={handleChange}
        /> */}
        <label>Họ và tên</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <label>Lớp</label>
        <select
          type="text"
          placeholder="acclass_id"
          name="acclass_id"
          value={newStudent.acclass_id}
          onChange={handleChange}
          >
            <option value="">Select</option>
             {dataAcclass.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <label>Khoa</label>
       
         <select
          type="text"
          placeholder="department_id"
          name="department_id"
          value={newStudent.department_id}
          onChange={handleChange}
          >
              <option value="">Select</option>
             {dataDepartment.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <div>{newData.name || "abc"}</div>
        <button onClick={addStudent}>Add</button>
      </div>
    </div>
  );
}
