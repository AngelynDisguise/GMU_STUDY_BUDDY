import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Link, Route } from 'react-router-dom';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MatchUser from './MatchUser';

//images
import Mengistu from '../images/mengistu.jfif';
import Russell from '../images/russell.jfif';
import Helms from '../images/helms.jpg';
import Monkeh from '../images/monkeh.jpg'

function Home() {
  /*Array of Tinder Cards 
  - dummy data: cs professors
  - will eventually be generated based off "matches" 
  from existing accounts, stored in database
  */
  const [students, setStudents] = useState([
    {
      name: "Mengistu",
      url: Mengistu,
      gender: "M",
    },
    {
      name: "Monkeh, hehe",
      url: Monkeh,
      gender: "M",
    },
    {
      name: "Russell",
      url: Russell,
      gender: "F",
    }, 
    {
      name: "Ed Helms",
      url: Helms,
      gender: "M",     
    },
  ]);

  return (
    <div className='home'>
      <div className='home-header'>
        <h1>Home!</h1>
      </div>
      
      <div className='cardsContainer'>
        
        {students.map((student) => (
          
          <TinderCard 
            className="Swipe"
            key={student.name}
            preventSwipe={['up', 'down']}
          >
            <div 
              className="card"
              style={{ backgroundImage: `url(${student.url})` }}
            >
              <h3>{student.name}</h3>
              
              <Link to={{
                pathname: "/matchUser/" + student.name,
              }}>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Link>              
            
            </div>
          
          </TinderCard>
          
        ))}
      </div>
     
    </div>
  );
}

export default Home;