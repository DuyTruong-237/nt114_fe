import React,  { useState, useEffect } from 'react'
import './Manage.css'
import Searchicon  from '../../img/search.png'
import Editicon from '../../img/edit.png' 
import axios from 'axios'

export default function Student() {
     const [lecturers, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/v1/lecturer/getAllLecturer')
        .then(response=> {
            const lecturer = response.data;
            console.log(lecturer)
            setData(lecturer);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
  return (
    <div className='List_Wrapper'>
        <div className='List_Header'>
            <div>DANH SÁCH GIẢNG VIÊN: </div>
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
                    
                    <th><b>Falculty</b></th>
                </tr>
            </thead>
            <tbody className='Manage_Info'>
                {lecturers.map(lecturer =>(<tr className='Odd'>
                    <td>{lecturer.id}</td>
                    <td>{lecturer.name}</td>
                   
                    <td>{lecturer.department_id.name}</td>
                </tr>))}
                {/* <tr className='Even'>
                    <td>2</td>
                    <td>Severus Snape</td>
                   
                    <td>Slytherin</td>
                </tr>
                <tr className='Odd'>
                    <td>3</td>
                    <td>Minerva McGonagall</td>
                    
                    <td>Gryffindor</td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}
