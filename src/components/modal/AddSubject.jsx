import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome

export default function AddSubject({ 
  closeAddModal, 
  newSubject, 
  handleChange
}) {
  const [newData, setNewData] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataAcclass, setDataAcclass] = useState([]);

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

  const addSubject = () => {
    console.log(newSubject);
    axios
      .post('http://localhost:3001/v1/subject/addSubject', newSubject)
      .then((response) => {
        const newData = response.data;
        setNewData(newData);
        closeAddModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <span className="close" onClick={closeAddModal}>
          <FontAwesomeIcon icon={faWindowClose} size="lg" style={{ color: '#f8e3e3' }} />
        </span>
        <h2>Add Subject</h2>
      </div>
      <div className="modal-content">
        <label>Subject ID</label>
        <input
          type="text"
          placeholder="Subject ID"
          name="id"
          value={newSubject.id}
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newSubject.name}
          onChange={handleChange}
        />
        <label>Department</label>
        <select
          type="text"
          placeholder="Department"
          name="department_id"
          value={newSubject.department_id}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {dataDepartment.map((data) => (
            <option key={data._id} value={data._id}>
              {data.name}
            </option>
          ))}
        </select>
        <label>Credit Unique</label>
        <input
          type="text"
          placeholder="Credit Unique"
          name="credit_unique"
          value={newSubject.credit_unique}
          onChange={handleChange}
        />

        <div>{newData.name || 'abc'}</div>
        <button onClick={addSubject}>Add</button>
      </div>
    </div>
  );
}
