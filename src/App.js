import logo from './logo.svg';
import './App.css';

import TopHeader from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import Calendar from  './components/calendar/calendar';
import Notification from './components/notification/Notification';
import MainCourse from './components/content/MainCourse';
import Department_Management from './screen/Manage/Department_Management';
import Profile from './screen/Profile/Profile';
import Inbox from './screen/Inbox/Inbox';
import Home from './screen/Home/Home';
import Login from './screen/Login/Login';
import Student_Management from './screen/Manage/Student_Management';
import Info_Reading from './screen/ReadingScreen/Reading_Screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './components/manage/Student';
import ClassDetails from './screen/ClassDetails/ClassDetails'
import LearningResult from './screen/LearningResult/LearningResult'
import SubjectManagement from './screen/SubjectManagement/Subject_Management';
import Lecturer_Management from './screen/Manage/Lecturer_Management';
import Faculty from './screen/Faculty/Faculty';
function App() {

  return (
   
    <div className='app_js'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/noti/:id' element = {<Info_Reading/>}/>
        <Route path='/inbox' element={<Inbox/>}/>
        <Route path='/student' element={<Student_Management/>}/>
        <Route path='/lecturer' element={<Lecturer_Management/>}/>
        <Route path='/department' element={<Department_Management/>}/>
        <Route path='/class-detail' element={<ClassDetails/>}/>
        <Route path='/learning-result' element={<LearningResult/>}/>
        <Route path='/subject-manage' element={<SubjectManagement/>}/>
        <Route path='/faculty/:id' element={<Faculty/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
    

  );
}

export default App;
