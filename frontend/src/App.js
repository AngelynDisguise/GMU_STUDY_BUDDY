import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Matches from './components/Matches';
import MatchUser from './components/MatchUser'
import EditProfile from './components/EditProfile';
import Footer from './components/Footer';
import Help from './components/Help';
// import Chat from './components/Chat';

//styles
import './App.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/Profile.css';
import './styles/Matches.css';
import './styles/MatchUser.css';
import './styles/EditProfile.css';
import './styles/Footer.css';
import './styles/Help.css';
// import './styles/Chat.css';

function App() {
//   //TOKEN CODE **********************************************************
//   // token: gives user access to app if they are logged in
//   const [token, setToken] = useState(null);
//   // user: identifies logged in user; used to access user information
//   const [userEmail, setUserEmail] = useState(null);
// // 
//   // console.log(localStorage.getItem('token'));
//   // 
//   if(!token && !localStorage.getItem('token')) {
//     console.log("(App.js) App token: "+token+"\nRedirecting to Login...");
//     return <Auth setToken={setToken} setUserEmail={setUserEmail} />
//   } else {
//     console.log("App token: "+token+"\nRedirecting to Home...");
//   }
//   //TOKEN CODE **********************************************************

  return ( 
    <div className="App" >
      {/* Header */}
      
      <div className="wrapper">
        {/* Routes */}
        <Routes>
          {/* Home: Profile+ Study Buddy Card + Matches List*/}
          {/* <Route path="/" element={<Register />} /> */}
          
          <Route path="/profile" element={<><Header backButton="/"/> <Profile /> <Footer /></>} />
          <Route path="/matches" element={<><Header backButton="/"/> <Matches /> <Footer /></>} />
          <Route path="/matchUser/:name" element={<><Header backButton="/"/> <MatchUser/> <Footer /></>} />
          <Route path="/editprofile" element={<><Header backButton="/profile"/> <EditProfile/> <Footer /></>} />
          <Route path='/help' element={<> <Header backButton="/"/> <Help/></>} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/" element={<><Header /> <Home /> <Footer /></>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;

