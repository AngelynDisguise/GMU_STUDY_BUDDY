import React, { useState } from 'react';
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

//styles
import './App.css';
import './styles/Login.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/ChatList.css';
import './styles/Chat.css';

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
      </div>
    </div>
  );
}

export default App;

