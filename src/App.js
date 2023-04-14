import './App.css';

import TopHeader from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import Calendar from  './components/calendar/calendar';
import Notification from './components/notification/Notification';
import MainContent from './components/content/MainCourse';
import Home from './screen/Home/Home';
import Profile from './screen/Profile/Profile';
import Inbox from './screen/Inbox/Inbox';

function App() {
  return (
   
    <div className='app_js'>
      <Inbox/>
    </div>
    
    

  );
}

export default App;
