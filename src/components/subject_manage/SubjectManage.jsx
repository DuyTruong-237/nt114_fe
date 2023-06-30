import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './SubjectManage.css';
import { Oval } from 'react-loader-spinner';
import Logo from '../../img/mainlogo.png'
import { Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from "../../img/search.png"
import Editicon from '../../img/edit.png';
import AddSubject from '../modal/AddSubject';
import UpdateSubject from '../modal/UpdateSubject';
import * as xlsx from 'xlsx';

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
    const [loading, setLoading] = useState(true);
    const [dataDepartment, setDataDepartment] = useState([]);
  // const [dataAcclass, setDataAcclass] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({ validSubjects: [], invalidSubjects: [] });

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/abc/getAll/department')
      .then((response) => {
        const dataSelect = response.data;
        setDataDepartment(dataSelect);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get('http://localhost:3001/v1/abc/getAll/acclass')
    //   .then((response) => {
    //     const dataAcclass = response.data;
    //     setDataAcclass(dataAcclass);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

    useEffect (() => {
        axios
        .get('http://localhost:3001/v1/abc/getAll/subject')
        .then((response) => {
            const subjects = response.data
            setSubjects(subjects);
            setFilteredSubjects(subjects);
            setLoading(false);
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

    const handleAddFromExcelClick = () => {
        document.getElementById('fileInput').click();
      };
    
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });
    
          // Đọc sheet đầu tiên trong workbook
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
           // Chuyển đổi dữ liệu từ sheet thành mảng các đối tượng môn học
          const jsonData = xlsx.utils.sheet_to_json(worksheet);
          console.log(jsonData)
          // Thêm môn học vào danh sách
          const newSubjects = jsonData.map((subject) => ({
            name: subject['Tên môn học'],
            departmentId: subject['Khoa'],
            cre: subject['Số tín chỉ'],
            // acclass_id: subject['Lớp'],
          }));
         console.log(newSubjects)
           // Tạo mảng để chứa các môn học đúng
        const validSubjects = [];
        // Tạo mảng để chứa các môn học sai
        const invalidSubjects = [];
    
        // Lặp qua từng môn học trong mảng jsonData
        jsonData.forEach((subject) => {
          const department_Id = subject['Khoa'];
          // const acclassId = subject['Lớp'];
          const subject_cre = subject['Số tín chỉ'];
          // Kiểm tra giá trị departmentId và acclassId
          const departmentExists = dataDepartment.some((department) => department._id === department_Id);
          // const acclassExists = dataAcclass.some((acclass) => acclass._id === acclassId);
          if (departmentExists && subject_cre >0 && subject_cre < 5) {
            validSubjects.push({
              name: subject['Tên môn học'],
              departmentId: department_Id,
              cre: subject['Số tín chỉ'],
              // acclass_id: acclassId,
            });
          } else {
            invalidSubjects.push({
              name: subject['Tên môn học'],
              departmentId: department_Id,
              cre: subject['Số tín chỉ'],
              // acclass_id: acclassId,
            });
          }
        });
          validSubjects.map((subject)=>{    
            axios
            .post('http://localhost:3001/v1/subject/addSubject/', subject)
            .then((response) => {
              console.log(response.data);
              // Cập nhật danh sách môn học sau khi thêm thành công
              setSubjects([...subjects, ...newSubjects]);
              setFilteredSubjects([...subjects, ...newSubjects]);
              setNotificationData({ validSubjects, invalidSubjects });
              setShowNotification(true);
              setTimeout(() => {
                  setShowNotification(false);
                  window.location.reload();
              }, 10000);       
            })
            .catch((error) => {
              console.log(error);
            });
          })
          // Gọi API để thêm môn học vào cơ sở dữ liệu
          
        };
    
        if (file) {
          reader.readAsArrayBuffer(file);
        }
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
      if (loading) {
        return (
          <div className="loading-spinner">
            <div className="loader-container">
              <div className="loader">
                <Oval type="Oval" color= "#FF7B54" height={80} width={80} />
                <img src={Logo} alt="Loading" className="logo-image" />
              </div>
            </div>
          </div>
        );
      }
      
    return (
        <div className="SubjectManage_wrapper">
            {showNotification && (
        <div className="TempNotification">
          <div className="TempNotification-Content">
            <div className="Valid">
              <div className="TempNotification-Title">Thêm thành công:</div>
              <ul>
                {notificationData.validSubjects.map((subject, index) => (
                  <li key={index}>{subject.name}</li>
                ))}
              </ul>
            </div>
            <div className="Invalid">
              <div className="TempNotification-Title">Thêm thất bại:</div>
              <ul>
                {notificationData.invalidSubjects.map((subject, index) => (
                  <li key={index}>{subject.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="TempNotification-Close" onClick={() => {
            setShowNotification(false)
            window.location.reload();
          }}>
            X
          </div>
        </div>
      )}
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
                    <button className="Add_From_Excel_btn Button" onClick={handleAddFromExcelClick}>
                        <i class="fas fa-regular fa-file-excel" style={{color: "#ff7b54",}}></i>  
                    </button>
                    <button className="Add_btn Button" onClick={handleAddButtonClick}>
                        <i class="fas fa-plus-square" style={{color: "#ff7b54",}}></i>
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".xlsx"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
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
                                <div className="Edit_btn btn" onClick={() => handleUpdateButtonClick(subject)}>
                                    <img className="Edit_icon" src={Editicon} alt="" />
                                </div>
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
