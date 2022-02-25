<<<<<<< HEAD
import React, { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import ChatList from './components/ChatList';
import Chat from './components/Chat';

//styles
import './App.css';
import './styles/Login.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/ChatList.css';
import './styles/Chat.css';
=======
import React from 'react';

import Header from './Header';

import './App.css';
>>>>>>> d2c69de (Formatted a couple of things)

function App() {
<<<<<<< HEAD
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return ( 
    <div className="App" >
      {/* Header */}
      <Header />
      <div className="wrapper">
        
        {/* Routes */}
        <Routes>
        
          {/* Chat list screen */}
          <Route path="/chatList" element={<ChatList />} />

          {/* Individual chat screen */}
          <Route path="/chat" element={<Chat />} />
          
          {/* Home: Login + Study Buddy Card */}
          <Route path="/" element={<Home />} />
      </Routes>
=======
  return (
    <div className="App">
        <Header />
<<<<<<< HEAD
<<<<<<< HEAD
        just noodlin hehe
>>>>>>> e1020d8 (just noodlin)
=======
>>>>>>> 578890f (fixed my noodlin hehe)
      </div>
=======

>>>>>>> d2c69de (Formatted a couple of things)
    </div>
  );
}

export default App;
