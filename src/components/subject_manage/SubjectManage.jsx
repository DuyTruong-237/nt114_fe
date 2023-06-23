import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router';
import './SubjectManage.css';
import SearchIcon from "../../img/search.png"
import AddSubject from '../modal/AddSubject';
import UpdateSubject from '../modal/UpdateSubject';

export default function SubjectManage(){
    const navigate = useNavigate();

    const handleRowClick = (subjectId) => {
        navigate(`/profile/${subjectId}`);
    };
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
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
    },[]);
    if (!subjects) {
        return <div>Loading...</div>;
    }

    const handleAddButtonClick = () => {
        setShowAddModal(true);   
    };
    
    const closeAddModal = () => {
        window.location.reload();
        setShowAddModal(false);
    };

    const closeUpdateModal = () => {
        window.location.reload();
        setShowUpdateModal(false);
    };

    const handleUpdateButtonClick = (subject) => {
        setSelectedSubject(subject);
        setShowUpdateModal(true);
    };

    const updateSubjectDetails = (subjectId, updatedDetails) => {
        axios
          .put(`http://localhost:3001/v1/subject/${subjectId}`, updatedDetails)
          .then((response) => {
            console.log(response.data);
            // Update the subjects state with the updated subject details
            const updatedSubjects = subjects.map((subject) =>
              subject.subject_id === subjectId ? { ...subject, ...updatedDetails } : subject
            );
            setSubjects(updatedSubjects);
            setShowUpdateModal(false);
          })
          .catch((error) => {
            console.log(error);
          });
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
            setShowAddModal(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setNewSubject((prevState) => ({
          ...prevState,
          [name]: value,
        }));
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
                    <button className="Delete_btn Button">
                        <i class="fas fa-minus-square" style={{color: "#ff7b54",}}></i>
                    </button>
                    <button className="Add_btn Button" onClick={handleAddButtonClick}>
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
                            <th>
                            <b>Actions</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="Manage_Info">
                        {filteredSubjects.map((subject) => (
                            <tr 
                                className="Odd"
                                key = {subject.subject_id}
                                onDoubleClick={() => handleRowClick(subject.subject_id)}
                            >
                            <td className='subjectId'>{subject.subject_id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.departmentId}</td>
                            <td>{subject.cre}</td>
                            <td>
                                <button className='Update_btn' onClick={() => handleUpdateButtonClick(subject)}>Update</button>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
                {showAddModal && (
                    <AddSubject
                        closeAddModal={closeAddModal}
                        newSubject={newSubject}
                        handleChange={handleChange}
                        addSubject={addSubject}
                    />
                )}
                {showUpdateModal && (
                    <UpdateSubject
                        closeUpdateModal={closeUpdateModal}
                        selectedSubject={selectedSubject}
                        updateSubjectDetails={updateSubjectDetails}
                    />
                )}
            </div>
            
        </div>
    )
}
