import React,  { useState, useEffect } from 'react';
import './AddData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios'
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome
  let dataSelect="";
export default function AddLecturer({
  closeModal,
  newLecturer,
  handleChange,
  addLecturer
}) {
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
          <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}}/>
        </span>
        <h2>Add Lecturer</h2>
      </div>
      <div className="modal-content">
         <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newLecturer.name}
          onChange={handleChange}
        />
         <label>Department</label>
        <select
          type="text"
          placeholder="department_id"
          name="department_id"
          value={newLecturer.department_id}
          onChange={handleChange}
          >
             {dataDepartment.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <label>Falculty</label>
        <input
          type="text"
          placeholder="Falculty"
          name="faculty"
          value={newLecturer.faculty}
          onChange={handleChange}
        />
        <button onClick={addLecturer}>Add</button>
      </div>
    </div>
  );
}