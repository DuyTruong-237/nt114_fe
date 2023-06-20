import React from "react";
import './SubjectManage.css';
import SearchIcon from "../../img/search.png"


export default function SubjectManage(){
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
                    <input className="searchInput" type="text" placeholder="Tìm kiếm môn học"/>
                    <button className="searchIcon">
                        <img className='Searching' src={SearchIcon} alt="search" />
                    </button>
                </div>
                <div className="manage_button">
                    <button className="Delete_btn Button">
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
                        <tr className="Odd">
                            <td>ACCT3603</td>
                            <td>Hệ thống thông tin kế toán</td>
                            <td>HTTT</td>
                            <td>3</td>
                        </tr>
                        <tr className="Odd">
                            <td>ACCT5123</td>
                            <td>Hoạch định nguồn lực doanh nghiệp</td>
                            <td>HTTT</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
