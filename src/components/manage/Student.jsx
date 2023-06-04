import React from 'react'
import './Manage.css'
import Searchicon  from '../../img/search.png'
import Editicon from '../../img/edit.png' 

export default function Student() {
  return (
    <div className='List_Wrapper'>
        <div className='List_Header'>
            <div>DANH SÁCH SINH VIÊN: </div>
        </div>
        <div className='List_Toolbar'>
            <div className='Search_toolbar'>Tìm kiếm
                <img className='Search_icon' src={Searchicon} alt="" />
            </div>
            <div>
                <div className='Edit_btn'>
                    <img className='Edit_icon' src={Editicon} alt="" />
                </div>
                <div className='Add_btn'>+ Add</div>
            </div>
        </div>
        <table>
            <thead className='List_Title'>
                <tr>
                    <th><b>ID</b></th>
                    <th><b>Name</b></th>
                    <th><b>Class</b></th>
                    <th><b>Falculty</b></th>
                </tr>
            </thead>
            <tbody className='Manage_Info'>
                <tr className='Odd'>
                    <td>1</td>
                    <td>Harry Potter</td>
                    <td>Phòng chống nghệ thuật hắc ám</td>
                    <td>Gryffindor</td>
                </tr>
                <tr className='Even'>
                    <td>2</td>
                    <td>Draco Malfoy</td>
                    <td>Độc dược</td>
                    <td>Slytherin</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
