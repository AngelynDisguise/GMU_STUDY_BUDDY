import React , { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//Angelyn's change

//components
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import Register from './components/Register';
import Matches from './components/Matches';
import Profile from './components/Profile';

//styles
import './App.css';
import './styles/Login.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/ChatList.css';
import './styles/Chat.css';
import './styles/Matches.css';
import './styles/Profile.css';

function App() {
  const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return ( 
    <div className="App" >
      {/* Header */}
      <Header/>
      

      {/* {!token ?? <Login setToken={setToken} />} */}
      <div className="wrapper">
        
        {/* Routes */}
        <Routes>
          
          {/* Chat list screen */}
          <Route path="/chatList" element={<ChatList />} />
          
          {/* Individual chat screen */}
          <Route path="/chat" element={<Chat />} />
          
          {/* Create Account Screen */}
          <Route path="/register" element={<Register />} />
          
          {/* Login Screen */}
          <Route path="/login" element={<Login />} />

          {/* Matches Screen */}
          <Route path="/matches" element={<Matches />} />

          {/* Profile UI */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Home: Login + Study Buddy Card */}
          <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;

