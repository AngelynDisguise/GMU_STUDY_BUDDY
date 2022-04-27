import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {getUserInfo} from '../util/UserInfo';

import Anon from '../images/anon.jpg';


function MatchUser(props) {
    /* User Variables */
    let { name } = useParams();
    //const location = useLocation();
    //const { gender } = location.state;
    const [matchGender, setMatchGender] = useState("");
    const [matchMajor, setMatchMajor] = useState("");
    const [matchAge, setMatchAge] = useState("");

    useEffect(() => {
        console.log("MatchUser.js: useEffect()");
        // getUserInfo(props.UserEmail)
        // .then((user) => {
        //     setMatchGender(user.matchList[user.matchList.length-1].gender);
        //     setMatchMajor(user.matchList[user.matchList.length-1].major);
        //     setMatchAge(user.matchList[user.matchList.length-1].age);
        // });
        console.log(props.matchList2)
        console.log(props.matchList2.length)
        if(props.matchList2 && props.matchList2.length > 0) {
            //props.matchList2.forEach((user) => {console.log(user)});
            setMatchGender(props.matchList2[props.matchList2.length-1].gender);
            setMatchMajor(props.matchList2[props.matchList2.length-1].major);
            setMatchAge(props.matchList2[props.matchList2.length-1].age);
        }
    }, [])
    
    return(
        <div className='matchuser-wrapper'>
            <div className='mu-header'>
                <h2>User info</h2>
            </div>
            
            <div className='mu-info'>
                <div className='mu-pfp'>
                    <img src={Anon} height="100" width="100"/>
                </div>

                <div className='mu-name'>
                    <h2>Name: {name}</h2>
                </div>

                <div className='mu-gender'>
                    <h3>Gender: {matchGender}</h3>
                </div>
                
                <div className='mu-major'>
                    <h3>Major: {matchMajor}</h3>
                </div>
                
                <div className='mu-age'>
                    <h3>Age: {matchAge}</h3>
                </div>
            </div>
            
        </div>
    );
}

export default MatchUser;