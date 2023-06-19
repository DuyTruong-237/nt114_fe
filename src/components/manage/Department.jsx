import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Manage.css';
import Searchicon from '../../img/search.png';
import Editicon from '../../img/edit.png';
import axios from 'axios';
import AddDepartment from '../modal/AddDepartment';

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [newDepartment, setNewDepartment] = useState({
    id: '',
    name: '',
    description: '',
    dean: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/depart/getAllDepartment/')
      .then((response) => {
        const departments = response.data;
        setDepartments(departments);
        setFilteredDepartments(departments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true); // Hiển thị modal khi người dùng nhấp vào nút "Add_btn"
  };

  const closeModal = () => {
    setShowModal(false); // Đóng modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: value
    }));
  };

  const addDepartment = () => {
    axios
      .post('http://localhost:3001/v1/depart/addDepartment', newDepartment)
      .then((response) => {
        // Xử lý phản hồi từ server khi thêm thành công
        console.log(response.data);

        // Sau khi thêm thành công, đặt lại trạng thái và đóng modal
        setNewDepartment({
          id: '',
          name: '',
          class: '',
          faculty: ''
        });
        setShowModal(false);
      })
      .catch((error) => {
        // Xử lý phản hồi từ server khi có lỗi
        console.log(error);
      });
  };

  const Navigate = useNavigate();

  const handleRowClick = (departmentid) => {
    Navigate(`/faculty/${departmentid}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = departments.filter((department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };
  return (
    <div className="List_Wrapper">
      <div className="List_Header">
        <div>DANH SÁCH KHOA: </div>
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
            <img className="Search_icon" src={Searchicon} alt="" />
          </button>
        </div>
        <div>
          <div className="Edit_btn btn">
            <img className="Edit_icon" src={Editicon} alt="" />
          </div>
          <div className="Add_btn btn" onClick={handleAddButtonClick}>
            + Add
          </div>
        </div>
      </div>
      <table>
        <thead className="List_Title">
          <tr>
            <th >
              <b>Name</b>
            </th>
            <th>
              <b>Dean</b>
            </th>
            <th>
              <b>Description</b>
            </th>
          </tr>
        </thead>
        <tbody className="Manage_Info">
          {filteredDepartments.map((department) => (
            <tr
              className="Odd"
              key={department.id}
              onDoubleClick={() => handleRowClick(department._id)}
            >
              <td className="departmentId">{department.name}</td>
              <td>{department.dean || ''}</td>
              <td>{department.des || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <AddDepartment
          closeModal={closeModal}
          newStudent={newDepartment}
          handleChange={handleChange}
          addStudent={addDepartment}
        />
      )}
    </div>
  );
}
