import React,  { useState, useEffect } from 'react'
import './Manage.css'
import Searchicon  from '../../img/search.png'
import Editicon from '../../img/edit.png' 
import axios from 'axios'

export default function Student() {
    const [students, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/v1/student/getAllStudent/')
        .then(response=> {
            const students = response.data;
            console.log(students)
            setData(students);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
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
                {students.map(student =>( <tr className='Odd'>
                    <td>{student.id}</td>
                    <td>{student.name || ""}</td>
                    <td>{student.acclass_id.name || ""}</td>
                    <td>{student.department_id.name || ""}</td>
                </tr>))}
               
                {/* <tr className='Even'>
                    <td>2</td>
                    <td>Draco Malfoy</td>
                    <td>Độc dược</td>
                    <td>Slytherin</td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}
