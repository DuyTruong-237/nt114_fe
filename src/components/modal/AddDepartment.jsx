import React from 'react';
import './AddData.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome
export default function AddDepartment({
  closeAddModal,
  newDepartment,
  handleChange,
  addDepartment
}) {
  return (
    <div className="modal">
        <div className="modal-header">
          <span className="close" onClick={closeAddModal}>
            <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}} />
          </span>
          <h2>Add Department</h2>
        </div>
      <div className="modal-content">
        {/* Nội dung của modal */}
        <label>Tên khoa</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newDepartment.name}
          onChange={handleChange}
        />
        <label>Trưởng Khoa</label>
        <input
          type="text"
          placeholder="Dean"
          name="dean"
          value={newDepartment.class}
          onChange={handleChange}
        />
        <label>Mô tả</label>
        <input
          type="text"
          placeholder="Description"
          name="des"
          value={newDepartment.faculty}
          onChange={handleChange}
        />
        <button onClick={addDepartment}>Add</button>
      </div>
    </div>
  );
}
