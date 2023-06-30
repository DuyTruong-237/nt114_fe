
import './App.css';
import React, { useState } from 'react';
import Header from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import DepartmentManagement from './screen/Manage/Department_Management';
import Profile from './screen/Profile/Profile';
import Inbox from './screen/Inbox/Inbox';
import Home from './screen/Home/Home';
import Login from './screen/Login/Login';
import StudentManagement from './screen/Manage/Student_Management';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClassDetails from './screen/ClassDetails/ClassDetails'
import LearningResult from './screen/LearningResult/LearningResult'
import ReadingScreen from './screen/ReadingScreen/Reading_Screen'
import SubjectManagement from './screen/SubjectManagement/Subject_Management';
import LecturerManagement from './screen/Manage/Lecturer_Management';
import ForgotPassword from './screen/ForgotPassword/ForgotPassword';
import Faculty from './components/faculty/Faculty';
function App() {

  

  return (
   
    <div className='app_js'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/noti/:id' element={<ReadingScreen/>} />
        <Route path='/faculty/:id' element={<Faculty/>} />
        <Route path='/profile/:role/:id' element={<Profile/>}/>
        <Route path='/inbox' element={<Inbox/>}/>
        <Route path='/student' element={<StudentManagement/>}/>
        <Route path='/lecturer' element={<LecturerManagement/>}/>
        <Route path='/department' element={<DepartmentManagement/>}/>
        <Route path='/class-detail' element={<ClassDetails/>}/>
        <Route path='/learning-result/:role/:id' element={<LearningResult/>}/>
        <Route path='/subject-manage' element={<SubjectManagement/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
    

  );
}

export default App;
