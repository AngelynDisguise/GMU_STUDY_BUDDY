import React, {useState} from 'react';
import {removeStudyBuddy} from '../util/UserInfo';

import '../styles/Matches.css';


import Mengistu from '../images/mengistu.jfif';
import Monkeh from '../images/monkeh.jpg';
import Russell from '../images/russell.jfif';
import Helms from '../images/helms.jpg';
import Anon from '../images/anon.jpg';

function Matches(props) {

  //Dummy code for testing
  // const [students, setStudents] = useState([
    //     {
    //       name: "Mengistu",
    //       url: Mengistu,
    //       email: "yay@gmu.edu",
    //       number: "(555)555-5555",
    //       bio: "CS Professor. Why am I here?",
    //     },
    //     {
    //       name: "Monkeh, hehe",
    //       url: Monkeh,
    //       email: "pe@gmu.edu",
    //       number: "(555)555-5555",
    //       bio: "monkey",
    //     },
    //     {
    //       name: "Russell",
    //       url: Russell,
    //       email: "donk@gmu.edu",
    //       number: "(555)555-5555",
    //       bio: "CS Professor, hehe",
    //     }, 
    //     {
    //       name: "Ed Helms",
    //       url: Helms,   
    //       email: "plep@gmu.edu",  
    //       number: "(555)555-5555",
    //       bio: "Actor",
    //     },
    // ]);

    return(
        <div className='matches'>
            <h2>Matches</h2>
            <div className='matches-body'>
                {props.studyBuddyList.map((student) => (
                    <div className='matches-profile'
                          key={student.email}
                    >
                        <div className='matches-profpic'>
                          <img src={Anon} height="100" width="100"/>
                        </div>
                        <div className='matches-userinfo'>
                          <h4>Name: {student.firstName} {student.lastName}</h4>
                          <h5>Email: {student.email}</h5>
                          <h5>Major: {student.major}</h5>
                          <h5>Gender: {student.gender}</h5>
                          <h5>Age: {student.age}</h5>
                          <h5>Classes Taken/Taking: {student.classesTaken}</h5>
                        </div>
                        <div className='matches-userinfo2'>
                          <h3>Bio: {student.bio}</h3>
                        </div>
                        <div className='matches-unmatch_Button'>
                          <button type='submit' onClick={()=>{
                            removeStudyBuddy(props.userEmail, student.email)
                            props.setStudyBuddyList(props.studyBuddyList.filter((s)=>s.email!==student.email));
                          }}>Unmatch</button>
                        </div>
                    </ div>                    
                ))}
            </div>
        </div>
    );
}

export default Matches;