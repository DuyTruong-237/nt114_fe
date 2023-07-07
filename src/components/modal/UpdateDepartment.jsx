import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import './AddData.css';

config.autoAddCss = false; // Remove automatic CSS addition of FontAwesome

export default function UpdateDepartment({
  closeUpdateModal,
  selectedDepartment,
  updateDepartmentDetails,
}) {
  const [department, setDepartment] = useState(selectedDepartment || {
    _id: '',
    name: '',
    des: '',
    dean: '',
    vDean: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/v1/depart/updateDepartment/${department._id}`, department)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/v1/depart/deleteDepartment/${department._id}`)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
        updateDepartmentDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="modal">
      <div className="modal-header">
        <span className="close" onClick={closeUpdateModal}>
          <FontAwesomeIcon
            icon={faWindowClose}
            size="lg"
            style={{ color: '#f8e3e3' }}
          />
        </span>
        <h2>Update Department</h2>
      </div>
      <div className="modal-content">
        <label>ID</label>
        <input
          type="text"
          name="_id"
          value={department._id}
          onChange={handleChange}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={department.name}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="des"
          value={department.des}
          onChange={handleChange}
        ></textarea>

        <label>Dean</label>
        <input
          type="text"
          name="dean"
          value={department.dean}
          onChange={handleChange}
        />

        <label>Vice Dean</label>
        <input
          type="text"
          name="vDean"
          value={department.vDean}
          onChange={handleChange}
        />

        <div className='Handle_btn'>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}