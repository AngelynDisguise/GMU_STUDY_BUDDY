import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import { Link, Route } from 'react-router-dom';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {getUserInfo, fetchMatchList, popMatchUser, addStudyBuddy} from '../util/UserInfo';
import MatchUser from './MatchUser';

//images
import Mengistu from '../images/mengistu.jfif';
import Russell from '../images/russell.jfif';
import Helms from '../images/helms.jpg';
import Monkeh from '../images/monkeh.jpg';
import Anon from '../images/anon.jpg';

function Home(props) {

  const [matchList, setMatchList] = useState([]);

  useEffect (() => {
    console.log("Home.js: useEffect()");
    console.log(props.userEmail);
    //create new match list
    fetchMatchList(props.userEmail).then(matchList => {
      if(matchList) {
        setMatchList(matchList);
        props.setMatchList2(matchList);
        console.log(matchList);
      }
    });
    //set study buddy list
    getUserInfo(props.userEmail).then(user => {
      if(user && user.studyBuddyList) {
        props.setStudyBuddyList(user.studyBuddyList);
        console.log(user.studyBuddyList);
      }
    });
  }, []);

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
    //remove user from match list
    popMatchUser(props.userEmail).then((removedMatchUser) => {
      if(removedMatchUser) {
      console.log(removedMatchUser.firstName + " removed from match list");
      if(direction === 'right') {
        //add removed user to study buddy list
        addStudyBuddy(props.userEmail, removedMatchUser.email)
        .then((list) => {
          //save study buddy list
          if(list) {
            props.setStudyBuddyList(list);
            console.log("New study buddy list made: ", list);
          }
        });
      }
    }});
  }

  function generateCards() {
    if(matchList && matchList.length > 0) {
      return (
        matchList.map((match) => (
          
          <TinderCard 
            className="Swipe"
            key={match.email}
            onSwipe={onSwipe}
            preventSwipe={['up', 'down']}
          >
            <div 
              className="card"
              style={{ backgroundImage: `url(${Anon})` }}
            >
              <h3 className="matchName">{match.firstName}</h3>
              <Link to={{
                pathname: "/matchUser/" + match.firstName,
              }}>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Link>
            </div>
          </TinderCard>
        ))
      );
    } else {
      return (
        <div className="no-match-err">
          <h1 className="no-match-err-line1">No Matches found :(</h1>
          <h2 className="no-match-err-line2">Please come back later!</h2>
        </div>
      );
    }
  }


  /*Array of Tinder Cards 
  - dummy data: cs professors
  - will eventually be generated based off "matches" 
  from existing accounts, stored in database
  */
  // const [matches, setMatches] = useState([
  //   {
  //     name: "Mengistu",
  //     url: Mengistu,
  //   },
  //   {
  //     name: "Monkeh, hehe",
  //     url: Monkeh,
  //   },
  //   {
  //     name: "Russell",
  //     url: Russell,
  //   }, 
  //   {
  //     name: "Ed Helms",
  //     url: Helms,     
  //   },
  // ]);

  return (
    <div className='home'>
      <div className='home-header'>
        <h2>Home</h2>
      </div>
      
      <div className='cardsContainer'>
        
        {generateCards()}
      </div>
    </div>
  );
}

export default Home;