import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';
import './AddData.css';

config.autoAddCss = false; // Remove automatic CSS addition of FontAwesome

export default function UpdateClass({
  closeUpdateModal,
  selectedClass,
  updateClassDetails,
}) {

  const [classes, setClasses] = useState(selectedClass || {
    subclass_id: '',
    subject_id:'',
    subname: '',  
    term: '',
    yearSchool: '',
  });
  const [stuClass, setStuclass] = useState();
  const [student_id, setStudentid] = useState({});

  const [dataStudent, setDataStudent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/student/getAllStudent/')
      .then((response) => {
        const dataStudent = response.data;
        console.log(dataStudent);
        setDataStudent(dataStudent)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClasses((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeStudent = (event) => {
    const { name, value } = event.target;
    setStudentid((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log(classes)
    axios
      .put(`http://localhost:3001/v1/subclass/updateSubClass/${classes._id}`, classes)
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
      .delete(`http://localhost:3001/v1/subclass/deleteSubClass/${classes._id}`)
      .then((response) => {
        console.log(response.data);
        closeUpdateModal();
        updateClassDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="modal">
      <div className="modal-header-UpdateClass">
        <span className="close" onClick={closeUpdateModal}>
          <FontAwesomeIcon
            icon={faWindowClose}
            size="lg"
            style={{ color: '#f8e3e3' }}
          />
        </span>
        <h2>Cập Nhật Môn Học</h2>
      </div>
      <div className="modal-content-UpdateClass">
        <label>Mã Lớp Học</label>
        <input
          type="text"
          name="subclass_id"
          value={classes.subclass_id}
          onChange={handleChange}
        />

        <label>Tên Lớp</label>
        <input
          type="text"
          name="subname"
          value={classes.subname}
          onChange={handleChange}
        />

        <label>Mã Môn Học</label>
        <textarea
          name="subject_id"
          value={classes.subject_id}
          onChange={handleChange}
        ></textarea>

        <label>Học Kỳ</label>
        <textarea
          name="term"
          value={classes.term}
          onChange={handleChange}
        ></textarea>

        <label>Năm Học</label>
        <input
          type="text"
          name="yearSchool"
          value={classes.yearSchool}
          onChange={handleChange}
        />
        <label>Mã Sinh Viên</label>
        <select
          type="text"
          name="student_id"
          value=""
          onChange={handleChangeStudent}        
        >
            <option value="">Chọn sinh viên</option>
             {dataStudent.map(data =>(<option value={data._id}>{data.name}</option>))}
        </select>
        <div className='Handle_btn'>
          <button onClick={handleUpdate}>Cập Nhật Lớp</button>
          <button onClick={handleDelete}>Xóa Lớp</button>
          <button >Thêm Sinh Viên</button>
        </div>
      </div>
    </div>
  );
}