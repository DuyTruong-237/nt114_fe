import './AddData.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React,  { useState, useEffect } from 'react';
import axios from '../../redux/axios-interceptor'

config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome
export default function AddClass({
  closeAddModal,
  newClass,
  handleChange,
  addClass
}) {
    const [dataSubject, setDataSubject] = useState([]);
    const [dataLecturer, setDataLecturer] = useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:3001/v1/subject/getAllSubject')
        .then((response) => {
          const dataSubject = response.data;
          console.log(dataSubject);
          setDataSubject(dataSubject)
        })
        .catch((error) => {
          console.log(error);
        });
        axios
        .get('http://localhost:3001/v1/lecturer/getAllLecturer')
        .then((response) => {
          const dataLecturer = response.data;
          setDataLecturer(dataLecturer)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <div className="modal">
        <div className="modal-header">
          <span className="close" onClick={closeAddModal}>
            <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}} />
          </span>
          <h2>Add Class</h2>
        </div>
      <div className="modal-content">
        {/* Nội dung của modal */}
        <label>Tên Lớp</label>
        <input
          type="text"
          placeholder="Name"
          name="subname"
          value={newClass.subname}
          onChange={handleChange}
          
        />
        <label>Môn Học</label>
        <select
          type="text"
          placeholder="Môn học"
          name="subject_id"
          value={newClass.subclass_id}
          onChange={handleChange}
        >
            <option value="">Chọn môn học</option>
             {dataSubject.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <label>Giảng Viên</label>
        <select
          type="text"
          placeholder="Dean"
          name="lecturer_id"
          value={newClass.lecturer_id}
          onChange={handleChange}
        >
            <option value="">Chọn giảng viên</option>
             {dataLecturer.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <label>Học Kỳ</label>
        <input
          type="text"
          placeholder="Học kỳ"
          name="term"
          value={newClass.term}
          onChange={handleChange}
        />
        <label>Năm Học</label>
        <input
          type="text"
          placeholder="Năm học"
          name="yearSchool"
          value={newClass.yearSchool}
          onChange={handleChange}
        />
        <button onClick={addClass}>Add</button>
      </div>
    </div>
  );
}