import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import { Link, Route } from 'react-router-dom';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {getUserInfo, fetchMatchList} from '../util/UserInfo';
import MatchUser from './MatchUser';

//images
import Mengistu from '../images/mengistu.jfif';
import Russell from '../images/russell.jfif';
import Helms from '../images/helms.jpg';
import Monkeh from '../images/monkeh.jpg';
import Anon from '../images/anon.jpg';

function Home(props) {

  const [matchList, setMatchList] = useState([]);
  const [user, setUser] = useState();

  useEffect (() => {
    console.log("Home.js: useEffect()");
    fetchMatchList(props.userEmail).then(result => {
      if(result) setMatchList(result);
      console.log(matchList);
    });
    getUserInfo(props.userEmail).then(result => {if(result) setUser(result.firstName)});
    //getMatchList();
  }, []);

  


  /*Array of Tinder Cards 
  - dummy data: cs professors
  - will eventually be generated based off "matches" 
  from existing accounts, stored in database
  */
  const [matches, setMatches] = useState([
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
        <h2>Home</h2>
      </div>
      
      <div className='cardsContainer'>
        
        {matches.map((match) => (
          
          <TinderCard 
            className="Swipe"
            key={match.name}
            preventSwipe={['up', 'down']}
          >
            <div 
              className="card"
              style={{ backgroundImage: `url(${match.url})` }}
            >
              <h3>{match.name}</h3>
              
              <Link to={{
                pathname: "/matchUser/" + match.name,
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