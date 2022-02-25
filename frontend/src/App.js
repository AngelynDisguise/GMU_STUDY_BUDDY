<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f4aebe4 (Implemented a simple header)
=======
>>>>>>> 262226a (Implemented a simple header)
import React, { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
<<<<<<< HEAD

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
<<<<<<< HEAD
=======

import React from 'react';

import Header from './Header';

import './App.css';

import './App.css';
import React from 'react';
import Header from './Header';
import { Router, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
>>>>>>> 262226a (Implemented a simple header)
=======
<<<<<<< HEAD
>>>>>>> 5226bd6 (just noodlin)

function App() {
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
import './App.css';
=======
>>>>>>> d2c69de (Formatted a couple of things)
import React from 'react';

import Header from './Header';

=======
>>>>>>> 0c2edba (Implemented a simple header)
import './App.css';
=======
>>>>>>> a670316 (Formatted a couple of things)
import React from 'react';
=======
>>>>>>> f4aebe4 (Implemented a simple header)

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

function App() {
<<<<<<< HEAD
  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
        <Header />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

>>>>>>> 83ea817 (Implemented a simple header)
=======
        just noodlin hehe
>>>>>>> e1020d8 (just noodlin)
=======
>>>>>>> 578890f (fixed my noodlin hehe)
=======
=======
=======
function App() {
>>>>>>> 5226bd6 (just noodlin)
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
<<<<<<< HEAD
<<<<<<< HEAD
        just noodlin hehe
>>>>>>> e1020d8 (just noodlin)
<<<<<<< HEAD
>>>>>>> 928a875 (just noodlin)
=======
=======
>>>>>>> 578890f (fixed my noodlin hehe)
>>>>>>> c6ae3c6 (fixed my noodlin hehe)
=======
        just noodlin hehe
>>>>>>> 666ae62 (just noodlin)
>>>>>>> 5226bd6 (just noodlin)
      </div>
=======

>>>>>>> d2c69de (Formatted a couple of things)
=======
      <div className="wrapper">
        <Header />
      </div>
>>>>>>> 0c2edba (Implemented a simple header)
=======
        <Header />

>>>>>>> a670316 (Formatted a couple of things)
=======
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
      </div>
>>>>>>> f4aebe4 (Implemented a simple header)
=======
      </div>
>>>>>>> 262226a (Implemented a simple header)
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default App;

=======
export default App;
>>>>>>> 83ea817 (Implemented a simple header)
=======
export default App;
>>>>>>> 0c2edba (Implemented a simple header)
=======
export default App;
>>>>>>> f4aebe4 (Implemented a simple header)
