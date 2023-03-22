import logo from './logo.svg';
import './App.css';

import TopHeader from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import Calendar from './components/calendar/calendar';
import Notification from './components/notification/Notification';

function App() {
  return (
   
    <div className='app_js'>
      <div className='Header'>
        <TopHeader/>
      </div>
    
    <SideBar />
    <Calendar/>
    <Notification/>
    </div>
    
    

  );
}

export default App;
