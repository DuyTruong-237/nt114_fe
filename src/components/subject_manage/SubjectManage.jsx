import React from "react";
import './SubjectManage.css';
import SearchIcon from "../../img/search.png"

export default function SubjectManage(){
    return (
        <div className="SubjectManage_wrapper">
            <center className="Title" >
                <h3>
                    <strong>
                        Danh sách môn học
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

            <table className="Subject_Table">
                <thead>
                    <tr>
                        <th>Số TT</th>
                        <th>Mã MH</th>
                        <th>Tên MH</th>
                        <th>Đơn vị quản lý chuyên môn</th>
                        <th>Số lượng tín chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ACCT3603</td>
                        <td>Hệ thống thông tin kế toán</td>
                        <td>HTTT</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>ACCT5123</td>
                        <td>Hoạch định nguồn lực doanh nghiệp</td>
                        <td>HTTT</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
