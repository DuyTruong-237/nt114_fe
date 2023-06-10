import React from 'react';
import './AddStudent.css'
export default function Modal({
  closeModal,
  newStudent,
  handleChange,
  addStudent
}) {
  return (
    <div className="modal">
        <div className="modal-header">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Add Student</h2>
        </div>
      <div className="modal-content">
        {/* Nội dung của modal */}

        <label>Mã số sinh viên</label>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={newStudent.id}
          onChange={handleChange}
        />
        <label>Họ và tên</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <label>Lớp</label>
        <input
          type="text"
          placeholder="Class"
          name="class"
          value={newStudent.class}
          onChange={handleChange}
        />
        <label>Khoa</label>
        <input
          type="text"
          placeholder="Faculty"
          name="faculty"
          value={newStudent.faculty}
          onChange={handleChange}
        />
        <button onClick={addStudent}>Add</button>
      </div>
    </div>
  );
}
