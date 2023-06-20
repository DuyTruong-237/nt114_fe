import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SubjectManage.css';
import SearchIcon from "../../img/search.png"


export default function SubjectManage(){
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSubject, setNewSubject] = useState({
        subject_id: '',
        name: '',
        departmentId: '',
        cre: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    useEffect (() => {
        axios
        .get('http://localhost:3001/v1/abc/getAll/subject')
        .then((response) => {
            const subjects = response.data
            setSubjects(subjects);
            setFilteredSubjects(subjects);
        })
        .catch((error) => {
            console.log(error);
        });
    });
    if (!subjects) {
        return <div>Loading...</div>;
    }

    const handleAddButtonClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        window.location.reload();
        setShowModal(false);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(); 
    };
    
    const handleSearch = () => {
        const filtered = subjects.filter((subject) => {
          return (
            subject.subject_id.includes(searchTerm) ||
            subject.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredSubjects(filtered);
    };

    // const navigate = useNavigate();

    // const handleRowClick = (subjectId) => {
    //     navigate(`/profile/${subjectId}`);
    // };

    const addSubject = () => {
        axios
          .post('http://localhost:3001/v1/subject/addSubject', newSubject)
          .then((response) => {
            console.log(response.data);
            setNewSubject({
                subject_id: '',
                name: '',
                departmentId: '',
                cre: ''
            });
            setShowModal(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return (
        <div className="SubjectManage_wrapper">
            <center className="Title" >
                <h3>
                    <strong>
                        DANH SÁCH MÔN HỌC
                    </strong>
                </h3>
            </center>
            <div className="interactive_bar">
                <div className="Search">
                    <input 
                        className="searchInput"
                        type="text" 
                        placeholder="Tìm kiếm môn học"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="searchIcon" onClick={handleSearch}>
                        <img className='Searching' src={SearchIcon} alt="search" />
                    </button>
                </div>
                <div className="manage_button">
                    <button className="Delete_btn Button" onClick={handleAddButtonClick}>
                        <i class="fas fa-minus-square" style={{color: "#ff7b54",}}></i>
                    </button>
                    <button className="Delete_btn Button">
                        <i class="fas fa-plus-square" style={{color: "#ff7b54",}}></i>
                    </button>
                </div>
            </div>
            <div className="List_Wrapper">
                <table>
                    <thead className="List_Title">
                        <tr>
                            <th>
                                <b>Subject ID</b>
                            </th>
                            <th>
                                <b>Name</b>
                            </th>
                            <th>
                                <b>Department</b>
                            </th>
                            <th>
                                <b>Credit Unique</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="Manage_Info">
                        {filteredSubjects.map((subject) => (
                            <tr 
                                className="Odd"
                                key = {subject.subject_id}
                                // onDoubleClick={() => handleRowClick(subject.subject_id)}
                            >
                            <td className='subjectId'>{subject.subject_id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.departmentId}</td>
                            <td>{subject.cre}</td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
                {/* {showModal && (
                    <AddSubject
                    closeModal={closeModal}
                    newStudent={newSubject}
                    addStudent={addSubject}
                />
                )} */}
            </div>
            
        </div>
    )
}
