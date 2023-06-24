import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import './AddData.css';

config.autoAddCss = false; // Remove automatic CSS addition of FontAwesome

export default function UpdateLecAndStu({
  closeUpdateModal,
  selectedData,
  updateDataDetails,
  type,
}) {
  const [data, setData] = useState(selectedData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const url = type === 'lecturer' ? `http://localhost:3001/v1/lecturer/updateLecturer/${data._id}` : `http://localhost:3001/v1/student/updateStudent/${data._id}`;
    axios
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    const url = type === 'lecturer' ? `http://localhost:3001/v1/lecturer/deleteLecturer/${data._id}` : `http://localhost:3001/v1/student/deleteStudent/${data._id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
        updateDataDetails();
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
        <h2>Update {type === 'lecturer' ? 'Lecturer' : 'Student'}</h2>
      </div>
      <div className="modal-content">
        {type === 'lecturer' && (
          <>
            <label>Lecturer ID</label>
            <input
              type="text"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
            <label>Department Name</label>
            <input
              type="text"
              name="department_name"
              value={data.department_id.name}
              onChange={handleChange}
            />
          </>
        )}

        {type === 'student' && (
          <>
            <label>Student ID</label>
            <input
              type="text"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
            <label>Department ID</label>
            <input
              type="text"
              name="department_id"
              value={data.department_id._id}
              readOnly
            />
            <label>Department Name</label>
            <input
              type="text"
              name="department_name"
              value={data.department_id.name}
              onChange={handleChange}
            />
          </>
        )}

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <div className="Handle_btn">
                <button className="update-button" onClick={handleUpdate}>
                    Update
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
                </div>
            </div>
        </div>
    );
}
