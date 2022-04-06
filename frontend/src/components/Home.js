import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

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
    },
    {
      name: "Monkeh, hehe",
      url: Monkeh,
    },
    {
      name: "Russell",
      url: Russell,
    }, 
    {
      name: "Ed Helms",
      url: Helms,     
    },
  ]);

  return (
    <div className='wrap'>
      <h1>Home!</h1>
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
            
            </div>
            
          </TinderCard>
        ))}
      </div>
     
    </div>
  );
}

export default Home;