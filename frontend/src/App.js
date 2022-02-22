import React from 'react';
import { 
  Routes, 
  Route
} from 'react-router-dom';

import './App.css';

function App() {
  return ( 
    <div className="App" >
      {/* Header */}
      <h1> Study Buddy App! </h1>
      <Routes>
        <Route path="/" element ={ <Home /> } />
      </Routes> 
    </div>
  );
}

let Home = () => {
  return <p> Home </p>;
}

export default App;

