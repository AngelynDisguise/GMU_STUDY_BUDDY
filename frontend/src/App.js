import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Header from './components/Header';
import Home from './components/Home';
import ChatList from './components/ChatList';
import Chat from './components/Chat';

//styles
import './App.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/ChatList.css';
import './styles/Chat.css';


function App() {
  return ( 
    <div className="App" >
      {/* Header */}
      <Header />
      <Routes>
        {/* Home: Login -> Study Buddy Card */}
        <Route path="/" element={<Home />} />
        {/* Chat list screen */}
        <Route path="/chatList" element={<ChatList />} />
        {/* Individual chat screen */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;

