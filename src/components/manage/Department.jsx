import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Manage.css';
import { Oval } from 'react-loader-spinner';
import Logo from '../../img/mainlogo.png'
import Searchicon from '../../img/search.png';
import Editicon from '../../img/edit.png';
import axios from '../../redux/axios-interceptor';
import AddDepartment from '../modal/AddDepartment';
import UpdateDepartment from '../modal/UpdateDepartment';
import { useSelector } from 'react-redux';

export default function Department() {
  const user = useSelector((state) => state.login?.currentUser);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    id: '',
    name: '',
    description: '',
    dean: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('http://localhost:3001/v1/depart/getAllDepartment/')
      .then((response) => {
        const departments = response.data;
        console.log(departments)
        setDepartments(departments);
        setFilteredDepartments(departments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddButtonClick = () => {
    setShowAddModal(true); // Hiển thị modal khi người dùng nhấp vào nút "Add_btn"
  };

  const closeAddModal = () => {
    window.location.reload();
    setShowAddModal(false); // Đóng modal
  };

  const handleUpdateButtonClick = (department) => {
    setSelectedDepartment(department);
    setShowUpdateModal(true);
};

  const closeUpdateModal = () => {
      window.location.reload();
      setShowUpdateModal(false);
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
        setShowAddModal(false);
        window.location.reload();
      })
      .catch((error) => {
        // Xử lý phản hồi từ server khi có lỗi
        console.log(error);
      });
  };

  const Navigate = useNavigate();

  const handleRowClick = (departmentId) => {
    Navigate(`/faculty/${departmentId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(); // Tự động lọc danh sách khi người dùng nhập giá trị
  };

  const handleSearch = () => {
    const filtered = departments.filter((department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };
   // Hàm xử lý cập nhật thông tin hàng
   const updateDepartmentDetails = () => {
    axios
      .put(
        `http://localhost:3001/v1/depart/updateDepartment/${selectedDepartment.id}`,
        selectedDepartment
      )
      .then((response) => {
        // Xử lý phản hồi từ server khi cập nhật thành công
        console.log(response.data);

        // Sau khi cập nhật thành công, đặt lại trạng thái và đóng modal
        setSelectedDepartment(null);
        setShowUpdateModal(false);
      })
      .catch((error) => {
        // Xử lý phản hồi từ server khi có lỗi
        console.log(error);
      });
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
        {user?.position=="admin"? <> 
          <div className="Add_btn btn" onClick={handleAddButtonClick}>
            + Add
          </div></>:""}
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
            <th>
              <b>Actions</b>
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
              <td>{department?.dean?.name || ''}</td>
              <td>{department?.des || ''}</td>
              <td>
                <div className="Edit_btn btn" onClick={() => handleUpdateButtonClick(department)}>
                  <img className="Edit_icon" src={Editicon} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showAddModal && (
        <AddDepartment
          closeAddModal={closeAddModal}
          newDepartment={newDepartment}
          handleChange={handleChange}
          addDepartment={addDepartment}
        />
      )}

      {showUpdateModal && (
        <UpdateDepartment
          closeUpdateModal={closeUpdateModal}
          selectedDepartment={selectedDepartment}
          // handleChange={(e) => {
          //   const { name, value } = e.target;
          //   setSelectedDepartment((prevDepartment) => ({
          //     ...prevDepartment,
          //     [name]: value
          //   }));
          // }}
          updateDepartmentDetails={updateDepartmentDetails}
        />
      )}  
    </div>
  );
}
