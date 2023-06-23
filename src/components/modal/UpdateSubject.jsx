import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import './AddData.css';

config.autoAddCss = false; // Remove automatic CSS addition of FontAwesome

export default function UpdateSubject({
  closeUpdateModal,
  selectedSubject,
  updateSubjectDetails,
}) {
    console.log(selectedSubject)
  const [subject, setSubject] = useState(selectedSubject || {
    subject_id: '',
    name: '',
    departmentId: '',
    desText: '',
    coProcess: '',
    coPractice: '',
    coMidterm: '',
    coEndterm: '',
    cre: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/v1/subject/updateSubject/${subject._id}`, subject)
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
      .delete(`http://localhost:3001/v1/subject/deleteSubject/${subject._id}`)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
        updateSubjectDetails();
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
        <h2>Update Subject</h2>
      </div>
      <div className="modal-content">
        <label>Subject ID</label>
        <input
          type="text"
          name="subject_id"
          value={subject.subject_id}
          onChange={handleChange}
        />

        <label>Department ID</label>
        <input
          type="text"
          name="departmentId"
          value={subject.departmentId}
          onChange={handleChange}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={subject.name}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="desText"
          value={subject.desText}
          onChange={handleChange}
        ></textarea>

        <label>Co Process (%)</label>
        <input
          type="text"
          name="coProcess"
          value={subject.coProcess}
          onChange={handleChange}
        />

        <label>Co Practice (%)</label>
        <input
          type="text"
          name="coPractice"
          value={subject.coPractice}
          onChange={handleChange}
        />

        <label>Co Midterm (%)</label>
        <input
          type="text"
          name="coMidterm"
          value={subject.coMidterm}
          onChange={handleChange}
        />

        <label>Co Endterm (%)</label>
        <input
          type="text"
          name="coEndterm"
          value={subject.coEndterm}
          onChange={handleChange}
        />

        <label>Credit</label>
        <input
          type="text"
          name="cre"
          value={subject.cre}
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
