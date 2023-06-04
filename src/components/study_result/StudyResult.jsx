import React from "react";
import './StudyResult.css';

export default function StudyResult () {
    return (
        <div className="Study_Result_wrapper">
            {/* Header */}
            <center className="Title" >
                <h3>
                    <strong>
                        BẢNG ĐIỂM SINH VIÊN
                    </strong>
                </h3>
            </center>

            {/* Student Profile Table */}
            <table className="Student_Profile_Table">
                <caption><strong>Thông tin sinh viên</strong></caption>
                <tbody>
                    <tr>
                        <td>Họ và tên:</td>
                        <td><strong>Lê Thanh Thảo Vy</strong></td>
                        <td>Ngày sinh:</td>
                        <td><strong>09-04-2002</strong></td>
                        <td>Giới tính:</td>
                        <td><strong>Nữ</strong></td>
                    </tr>
                    <tr>
                        <td>Mã SV: </td>
                        <td><strong>20522178</strong></td>
                        <td>Lớp sinh hoạt: </td>
                        <td><strong>MMCL2020</strong></td>
                        <td>Khoa</td>
                        <td><strong>MMT&TT</strong></td>
                    </tr>
                    <tr>
                        <td>Bậc đào tạo: </td>
                        <td><strong>Đại học</strong></td>
                        <td>Hệ đào tạo: </td>
                        <td colSpan={3}><strong>CLC</strong></td>
                    </tr>
                </tbody>
            </table>

            {/* Student Result */}
            <table className="Student_Result_Table">
                <caption><strong>Bảng điểm</strong></caption>
                <tbody>
                    <tr>
                        <th colSpan={1} ></th>
                        <th>Mã HP</th>
                        <th>Tên học phần</th>
                        <th>Tín chỉ</th>
                        <th>Điểm QT</th>
                        <th>Điểm GK</th>
                        <th>Điểm TH</th>
                        <th>Điểm CK</th>
                        <th>Điểm HP</th>
                        <th>Ghi chú</th>
                    </tr>
                    <tr>
                        <td colSpan={10}><center><b>Học kỳ 1 - Năm học 2020-2021</b></center></td> 
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>ENG01</td>
                        <td>Anh văn 1</td>
                        <td>4</td>
                        <td></td>
                        <td title></td>
                        <td></td>
                        <td></td>
                        <td>Miễn</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>ENG02</td>
                        <td>Anh văn 2</td>
                        <td>4</td>
                        <td></td>
                        <td title></td>
                        <td></td>
                        <td></td>
                        <td>Miễn</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><strong>Trung bình học kỳ</strong></td>
                        <td><strong>19</strong></td>
                        <td></td>
                        <td title></td>
                        <td></td>
                        <td></td>
                        <td><strong>6.62</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={10}><center><b>Học kỳ 2 - Năm học 2020-2021</b></center></td> 
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>IT002</td>
                        <td>Lập trình hướng đối tượng</td>
                        <td>4</td>
                        <td>8</td>
                        <td title></td>
                        <td>6.5</td>
                        <td>8</td>
                        <td>7.6</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
