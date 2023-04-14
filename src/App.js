import logo from './logo.svg';
import './App.css';

import TopHeader from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import Calendar from  './components/calendar/calendar';
import Notification from './components/notification/Notification';
import MainCourse from './components/content/MainCourse';
import Profile from './screen/Profile/Profile';
import Inbox from './screen/Inbox/Inbox';
import Home from './screen/Home/Home';
import Login from './screen/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
   
    <div className='app_js'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/inbox' element={<Inbox/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
    

  );
}

export default App;
