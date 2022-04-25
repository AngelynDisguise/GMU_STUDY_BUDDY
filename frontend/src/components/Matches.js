import React, {useState} from 'react';
import '../styles/Matches.css';


import Mengistu from '../images/mengistu.jfif';
import Monkeh from '../images/monkeh.jpg';
import Russell from '../images/russell.jfif';
import Helms from '../images/helms.jpg';

function Matches() {
    const [students, setStudents] = useState([
        {
          name: "Mengistu",
          url: Mengistu,
          email: "yay@gmu.edu",
          number: "(555)555-5555",
          bio: "CS Professor. Why am I here?",
        },
        {
          name: "Monkeh, hehe",
          url: Monkeh,
          email: "pe@gmu.edu",
          number: "(555)555-5555",
          bio: "monkey",
        },
        {
          name: "Russell",
          url: Russell,
          email: "donk@gmu.edu",
          number: "(555)555-5555",
          bio: "CS Professor, hehe",
        }, 
        {
          name: "Ed Helms",
          url: Helms,   
          email: "plep@gmu.edu",  
          number: "(555)555-5555",
          bio: "Actor",
        },
    ]);

    return(
        <div className='matches'>
            <h2>Matches</h2>
            <div className='matches-body'>
                {students.map((student) => (
                    <div className='matches-profile'
                          key={student.name}
                    >
                        <div className='matches-profpic'>
                          <img src={student.url} height="100" width="100"/>
                        </div>
                        <div className='matches-userinfo'>
                          <h4>{student.name}</h4>
                          <h5>{student.email}</h5>
                          <h5>{student.number}</h5>
                        </div>
                        <div className='matches-userinfo2'>
                          <h3>Bio: {student.bio}</h3>
                        </div>
                        <div className='matches-unmatch_Button'>
                          <button type='submit'>Unmatch</button>
                        </div>
                    </ div>                    
                ))}
            </div>
        </div>
    );
}

export default Matches;