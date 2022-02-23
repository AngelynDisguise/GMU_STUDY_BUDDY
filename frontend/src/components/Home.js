import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

//images
import Mengistu from '../images/mengistu.jfif';
import Russell from '../images/russell.jfif';

function Home() {
  /*Array of Tinder Cards 
  - dummy data: cs professors
  - will eventually be generated based off "matches" 
  from existing accounts, stored in database
  */
  const [students, setStudents] = useState([
    {
      name: "mengistu",
      url: Mengistu,
    },
    {
      name: "russell",
      url: Russell,
    },
  ]);

  return (
    <div>
      <h1>Home!</h1>

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
  );
}

export default Home;