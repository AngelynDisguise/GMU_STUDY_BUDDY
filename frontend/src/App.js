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
  const [token, setToken] = useState(null);

  if(!token) {
    console.log("App token: "+token+"\nRedirecting to Login...");
    return <Login setToken={setToken} />
  } else {
    console.log("App token: "+token+"\nRedirecting to Home...");

  }
  
  return ( 
    <div className="App" >
      {/* Header */}
      <Header />
      {/* {!token ?? <Login setToken={setToken} />} */}
      <div className="wrapper">
        
        {/* Routes */}
        <Routes>
          {/* Login and Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Individual chat screen */}
          <Route path="/chat" element={<Chat />} />
          
          {/* Home: Login + Study Buddy Card */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

