import React , { useState, useEffect } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

//components
import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Matches from './components/Matches';
import MatchUser from './components/MatchUser'
import EditProfile from './components/EditProfile';
import Footer from './components/Footer';
import Help from './components/Help';
// import Chat from './components/Chat';
import {getUserInfo, fetchMatchList} from './util/UserInfo';

//styles
import './App.css';
//import './styles/Auth.css'
import './styles/Header.css';
import './styles/Home.css';
import './styles/Profile.css';
import './styles/Matches.css';
import './styles/MatchUser.css';
import './styles/EditProfile.css';
import './styles/Footer.css';
import './styles/Help.css';
import { contextTypes } from 'react-tinder-card';
// import './styles/Chat.css';


import Mengistu from './images/mengistu.jfif';
import Russell from './images/russell.jfif';
import Helms from './images/helms.jpg';
import Monkeh from './images/monkeh.jpg';
import Anon from './images/anon.jpg';

function App() {
  
  // //USER INFO **********************************************************
  // // token: gives user access to app if they are logged in
  // const [token, setToken] = useState(null);
  // // userEmail: identifies logged in user; used to access user information
  // const [userEmail, setUserEmail] = useState(null);
  // // user info
  // const [userFirstName, setUserFirstName] = useState(null);
  // getUserInfo(userEmail).then(user => {if(user) setUserFirstName(user.firstName)});
  // const [studyBuddyList, setStudyBuddyList] = useState([]);
  // //const [matchList, setMatchList] = useState([]);
  // //USER INFO **********************************************************
  
  // //TOKEN CODE **********************************************************
  // //useFootGun
  // // useEffect(() => {
  // //   console.log("App.js: useEffect()");
  // //   setToken(localStorage.getItem('token'));
  // //   setUserEmail(localStorage.getItem('userEmail'));
  // // }, []);
  
  // if(!localStorage.getItem('token') && !localStorage.getItem('userEmail')) {
  //   console.log("(App.js) App token: "+token+"\nRedirecting to Login...");
  //   return <Auth setToken={setToken} setUserEmail={setUserEmail} />
  // } else {
  //   console.log("App.js: token: "+token+"\nRedirecting to Home...");
  //   // console.log("App.js: userEmail: "+userEmail);
  //   //console.log("App.js: username: "+userFirstName);
  // }
  // //TOKEN CODE **********************************************************
  
  let userFirstName = "Ian";
  const [studyBuddyList, setStudyBuddyList] = useState([
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


  return ( 
    <div className="App" >
      <div className="wrapper">
        <Routes>
          <Route path="/profile" element={<>
            <Header 
              user ={userFirstName} 
              backButton="/"
            /> 
            <Profile /> 
            <Footer/> 
          </>} />
          <Route path="/matches" element={<>
            <Header 
              user ={userFirstName} 
              backButton="/"
            /> 
            <Matches 
              userEmail={localStorage.getItem('userEmail')} 
              studyBuddyList= {studyBuddyList} 
              setStudyBuddyList= {setStudyBuddyList}
            /> 
            <Footer />
          </>} />
          <Route path="/matchUser/:name" element={<>
            <Header 
              user ={userFirstName} 
              backButton="/"
            /> 
            <MatchUser/> 
            <Footer />
          </>} />
          <Route path="/editprofile" element={<>
            <Header 
              user ={userFirstName} 
              backButton="/profile"
            /> 
            <EditProfile/> 
            <Footer/>
          </>} />
          <Route path='/help' element={<>
            <Header 
              user ={userFirstName} 
              backButton="/" 
            />
            <Help />
          </>} />
          
          <Route path="/" element={<>
            <Header user={userFirstName}/> 
            <Home 
              userEmail={localStorage.getItem('userEmail')} 
              setStudyBuddyList = {setStudyBuddyList}
            /> 
            <Footer />
          </>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;

