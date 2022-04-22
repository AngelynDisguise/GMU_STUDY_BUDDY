import React , { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Login from './components/Login';
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
import './styles/Login.css';
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
  //TOKEN CODE **********************************************************
  const [token, setToken] = useState(null);

  console.log(localStorage.getItem('token'));
  
  if(!token && !localStorage.getItem('token')) {
    console.log("App token: "+token+"\nRedirecting to Login...");
    return <Login setToken={setToken} />
  } else {
    console.log("App token: "+token+"\nRedirecting to Home...");
  }
  //TOKEN CODE **********************************************************

  return ( 
    <div className="App" >
      {/* Header */}
      <Header />
      <div className="wrapper">
        {/* Routes */}
        <Routes>
          {/* Home: Profile+ Study Buddy Card + Matches List*/}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matchUser/:name" element={<MatchUser/>} />
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path='/help' element={<Help/>} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>

     
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

