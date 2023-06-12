import React from 'react';
import './AddData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome
export default function AddLecturer({
  closeModal,
  newLecturer,
  handleChange,
  addLecturer
}) {
  return (
    <div className="modal">
      <div className="modal-header">
        <span className="close" onClick={closeModal}>
          <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}}/>
        </span>
        <h2>Add Lecturer</h2>
      </div>
      <div className="modal-content">
        <label>ID</label>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={newLecturer.id}
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newLecturer.name}
          onChange={handleChange}
        />
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