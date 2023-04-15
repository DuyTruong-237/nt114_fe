import React from 'react'
import './Student.css'

export default function Student() {
  return (
    <div className='List_Wrapper'>
        <div className='List_Header'>
            <b>DANH SÁCH SINH VIÊN</b>
        </div>
        <div className='List_Toolbar'>
            <div>Tìm kiếm
                <img src="" alt="" />
            </div>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                + Add
            </div>
        </div>
        <div className='List_Title'>
            <div><b>Student</b></div>
            <div><b>Name</b></div>
            <div><b>Class</b></div>
        <div><b>Falculty</b></div>
        </div>
        <div className='Student_Info'>
            <div>1</div>
            <div>Harry Potter</div>
            <div>Phòng chống nghệ thuật hắc ám</div>
            <div>Gryffindor</div>
        </div>
    </div>
  )
}
