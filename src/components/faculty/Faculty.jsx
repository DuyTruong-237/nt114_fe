import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Faculty.css'

export default function Faculty(){
    const [department, setSelectedDepartment] = useState(null);
    useEffect(() => {
        axios
          .get('http://localhost:3001/v1/depart/getAllDepartment/')
          .then((response) => {
            const departments = response.data;
            setSelectedDepartment(departments[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
      };
    return (
        <div className="Faculty_wrapper">           
            <div className="Faculty_Header">
                <h1 className="Header_Title"><center>{department?.name}</center></h1>
            </div>
            <div className="Faculty_Content">
                <div className="Content_wrap">
                    <h2 className="Content_Title">Giới thiệu khoa</h2>
                    <div className="Content_Intro">
                        <ul className="Content_List">
                            <li className="List-Content">{department?.des} </li>
                            <li className="List-Content">Trưởng khoa: {department?.dean} </li>
                            <li className="List-Content">
                            Khoa có nhiệm vụ đào tạo sinh viên theo 2 ngành: 
                                <ul className="Content_SubList">
                                    <li>Mạng máy tính và truyền thông dữ liệu</li>
                                    <li>An toàn thông tin</li>
                                </ul>
                            </li>
                            <li className="List-Content">Khoa phụ trách các môn học liên quan đến mạng, truyền thông, xử lý tín hiệu, An ninh thông tin cho các hệ Đào tạo thuộc trường </li>
                        </ul>
                    </div>
                </div>

                <div className="Content_wrap">
                    <div class="tabs_wrapper">
                        <div class="tabs">
                            <div class="tab">
                                <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch"/>
                                <label for="tab-1" class="tab-label">Giảng viên</label>
                                <div class="tab-content">
                                    <div className="FacultyTable_wrap">
                                        <table className="Faculty_Table">
                                            <thead className="FacultyTable_Head">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Họ và tên</th>
                                                    <th>Ngành</th>
                                                    <th>Bộ môn giảng dạy</th>
                                                </tr>
                                            </thead>
                                            <tbody className="FacultyTable_Body">
                                                <tr>
                                                    <td>1</td>
                                                    <td>ThS. Trần Thị Dung</td>
                                                    <td>Truyền thông</td>
                                                    <td>
                                                        <ul>
                                                            <li>Quản trị mạng và hệ thống</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab">
                                <input type="radio" name="css-tabs" id="tab-2" class="tab-switch"/>
                                <label for="tab-2" class="tab-label">Các môn học</label>
                                <div class="tab-content">
                                <div className="FacultyTable_wrap">
                                        <table className="Faculty_Table">
                                            <thead className="FacultyTable_Head">
                                                <tr>
                                                    <th>Mã MH</th>
                                                    <th>Tên MH</th>
                                                    <th>Mô tả môn học</th>
                                                </tr>
                                            </thead>
                                            <tbody className="FacultyTable_Body">
                                                <tr>
                                                    <td>1</td>
                                                    <td>ThS. Trần Thị Dung</td>
                                                    <td>Truyền thông</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}