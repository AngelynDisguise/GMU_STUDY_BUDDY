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

    return(
        <div className='matches'>
            <h2>Matches</h2>
            {students.map((student) => (
                <div className='profpics'>
                    <img src={student.url} height="100" width="100"/>
                    <h4>{student.name}</h4>
                    
                </ div>
                    
            ))}
        </div>
    );
}

export default Matches;