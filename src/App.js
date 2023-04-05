import logo from './logo.svg';
import './App.css';

import TopHeader from './components/top_header/TopHeader';
import SideBar from './components/side_bar/SideBar';
import Calendar from  './components/calendar/calendar';
import Notification from './components/notification/Notification';
import MainContent from './components/content/MainContent';
import Home from './screen/Home/Home';

function App() {
  return (
   
    <div className='app_js'>
      <Home/>
    </div>
    
    

  );
}

export default App;
