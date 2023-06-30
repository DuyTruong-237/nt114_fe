import React, { useState, useEffect } from 'react';
import './Manage.css';
import { Oval } from 'react-loader-spinner';
import Logo from '../../img/mainlogo.png'
import SearchIcon from '../../img/search.png';
import EditIcon from '../../img/edit.png';
import axios from '../../redux/axios-interceptor';
import { Navigate, useNavigate } from 'react-router-dom';
import AddLecturer from '../modal/AddLecturer';
import UpdateLecAndStu from '../modal/UpdateLecAndStu';
import Cookies from 'js-cookie';
import * as xlsx from 'xlsx';

export default function Lecturer() {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [newLecturer, setNewLecturer] = useState({
    id: '',
    name: '',
    faculty: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataDepartment, setDataDepartment] = useState([]);
  // const [dataAcclass, setDataAcclass] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ validLecturers: [], invalidLecturers: [] });

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

  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/lecturer/getAllLecturer')
      .then((response) => {
        const lecturerData = response.data;
        setLecturers(lecturerData);
        setFilteredLecturers(lecturerData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewLecturer({
      id: '',
      name: '',
      faculty: '',
    });
  };

  const handleUpdateButtonClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowUpdateModal(true);
  };

  const updateLecturerDetails = (lecturerId, updatedDetails) => {
    axios
      .put(`http://localhost:3001/v1/lecturer/updateLecturer/${lecturerId}`, updatedDetails)
      .then((response) => {
        console.log(response.data);
        const updatedLecturer = lecturers.map((lecturer) =>
          lecturer._id === lecturerId ? { ...lecturer, ...updatedDetails } : lecturer
        );
        setLecturers(updatedLecturer);
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const closeUpdateModal = () => {
    window.location.reload();
    setShowUpdateModal(false);
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewLecturer((prevLecturer) => ({
      ...prevLecturer,
      [name]: value,
    }));
  };

  const addLecturer = () => {
    axios
      .post('http://localhost:3001/v1/lecturer/addLecturer', newLecturer)
      .then((response) => {
        console.log(response.data);
        setNewLecturer({
          id: '',
          name: '',
          faculty: '',
        });
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(); // Tự động lọc danh sách khi người dùng nhập giá trị
  };

  const handleSearch = () => {
    const filtered = lecturers.filter((lecturer) => {
      return (
        lecturer.id.includes(searchTerm) ||
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredLecturers(filtered);
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

       // Chuyển đổi dữ liệu từ sheet thành mảng các đối tượng giảng viên
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
      console.log(jsonData)
      // Thêm giảng viên vào danh sách
      const newLecturers = jsonData.map((lecturer) => ({
        name: lecturer['Họ và tên'],
        department_id: lecturer['Khoa'],
        // acclass_id: lecturer['Lớp'],
      }));
     
       // Tạo mảng để chứa các giảng viên đúng
    const validLecturers = [];
    // Tạo mảng để chứa các giảng viên sai
    const invalidLecturers = [];

    // Lặp qua từng giảng viên trong mảng jsonData
    jsonData.forEach((lecturer) => {
      const departmentId = lecturer['Khoa'];
      // const acclassId = lecturer['Lớp'];

      // Kiểm tra giá trị departmentId và acclassId
      const departmentExists = dataDepartment.some((department) => department._id === departmentId);
      // const acclassExists = dataAcclass.some((acclass) => acclass._id === acclassId);
      if (departmentExists) {
        validLecturers.push({
          name: lecturer['Họ và tên'],
          department_id: departmentId,
          // acclass_id: acclassId,
        });
      } else {
        invalidLecturers.push({
          name: lecturer['Họ và tên'],
          department_id: departmentId,
          // acclass_id: acclassId,
        });
      }
    });
      validLecturers.map((lecturer)=>{
        axios
        .post('http://localhost:3001/v1/lecturer/addLecturer/', lecturer)
        .then((response) => {
          console.log(response.data);
          // Cập nhật danh sách giảng viên sau khi thêm thành công

          setLecturers([...lecturers, ...newLecturers]);
          setFilteredLecturers([...lecturers, ...newLecturers]);
          setNotificationData({ validLecturers, invalidLecturers });
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
      // Gọi API để thêm giảng viên vào cơ sở dữ liệu
      
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleRowClick = (lecturerId) => {
    navigate(`/profile/lecturer/${lecturerId}`);
    console.log(lecturerId);
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
    <div className="List_Wrapper">
      {showNotification && (
        <div className="TempNotification">
          <div className="TempNotification-Content">
            <div className="Valid">
              <div className="TempNotification-Title">Thêm thành công:</div>
              <ul>
                {notificationData.validLecturers.map((lecturer, index) => (
                  <li key={index}>{lecturer.name}</li>
                ))}
              </ul>
            </div>
            <div className="Invalid">
              <div className="TempNotification-Title">Thêm thất bại:</div>
              <ul>
                {notificationData.invalidLecturers.map((lecturer, index) => (
                  <li key={index}>{lecturer.name}</li>
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
      <div className="List_Header">
        <div>DANH SÁCH GIẢNG VIÊN:</div>
      </div>
      <div className="List_Toolbar">
        <div className="Search_toolbar">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="Search_btn" onClick={handleSearch}>
            <img className="Search_icon" src={SearchIcon} alt="" />
          </button>
        </div>
        <div>
          <div className="AddFromExcel_btn btn" onClick={handleAddFromExcelClick}>
              + Add from Excel
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <div className="Add_btn btn" onClick={handleAddButtonClick}>
            + Add
          </div>
        </div>
      </div>
      <table>
        <thead className="List_Title">
          <tr>
            <th>
              <b>ID</b>
            </th>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Falculty</b>
            </th>
            <th>
              <b>Actions</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
          {filteredLecturers.map((lecturer) => (
            <tr 
            className="Odd" 
            key={lecturer.id}
            onDoubleClick={() => handleRowClick(lecturer._id)}
            >
              <td className='lecturerId'>{lecturer.id}</td>
              <td>{lecturer.name}</td>
              <td>{lecturer.department_id?.name}</td>
              <td>
                <div className="Edit_btn btn" onClick={() => handleUpdateButtonClick(lecturer)}>
                  <img className="Edit_icon" src={EditIcon} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <AddLecturer
          closeModal={closeModal}
          newLecturer={newLecturer}
          handleChange={handleChange}
          addLecturer={addLecturer}
        />
      )}

      {showUpdateModal && (
        <UpdateLecAndStu
          closeUpdateModal={closeUpdateModal}
          selectedData={selectedLecturer}
          updateDataDetails={updateLecturerDetails}
          type="lecturer"
        />
      )}

    </div>
  );
}
