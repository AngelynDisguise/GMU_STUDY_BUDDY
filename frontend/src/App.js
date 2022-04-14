import React , { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Matches from './components/Matches';
import MatchUser from './components/MatchUser'
// import Chat from './components/Chat';

//styles
import './App.css';
import './styles/Login.css';
import './styles/Register.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/Profile.css';
import './styles/Matches.css';
import './styles/MatchUser.css';
// import './styles/Chat.css';

function App() {
  const [token, setToken] = useState(null);
  //const [register, setRegister] = useState(false);

  //setToken(localStorage.getItem('token'));
  //console.log(localStorage.getItem('token'));
  //console.log("Register: "+register);

  //if(!token && !localStorage.getItem('token')) {
    // if(register){
    //   console.log("App token: "+token+"\nRedirecting to Register...");
    //   return <Register setToken={setToken} setRegister={setRegister}/>
    // } else {
    //   console.log("App token: "+token+"\nRedirecting to Login...");
    //   return <Login setToken={setToken} setRegister={setRegister} />
    // }
    //console.log("App token: "+token+"\nRedirecting to Login...");
    //return <Login setToken={setToken} />
  //} else {
    //console.log("App token: "+token+"\nRedirecting to Home...");

  //}
  
  return ( 
    <div className="App" >
      {/* Header */}
      <Header />
      <div className="wrapper">
        
        {/* Routes */}
        <Routes>
          {/* Login and Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home: Profile+ Study Buddy Card + Matches List*/}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matchUser/:user" element={<MatchUser/>} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

