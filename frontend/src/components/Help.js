import React from 'react';
import '../styles/Help.css';

//images
import HomeScreen from '../images/home.png';
import SwipeRight from '../images/swright.png';
import SwipeLeft from '../images/swleft.png';
import ProfileScreen from '../images/profile.png';
import EditProfileScreen from '../images/edprofile.PNG';
import MatchesScreen from '../images/matches.png';


function Help({ fromPage }){
    
    return(
        <div className='help-wrapper'>
            <div className='help-header'>
                <h2>Help Page</h2>
            </div>

            <div className='help-body'>
                <h3>Welcome to the George Mason University Study Buddy App!</h3>
        
                <p>Let's get started!</p>
                <p>After logging in, you'll be greeted with the home screen</p>
                
                
                <div className='help-image-wrapper'>
                    <img src={HomeScreen} className='help-image'/>
                </div>
                
                <div className='help-image-wrapper'>
                    <img src={SwipeLeft} className='help-image'/>
                </div>
                
                <div className='help-image-wrapper'>
                    <img src={SwipeRight} className='help-image'/>
                </div>

                <div className='help-image-wrapper'>
                    <img src={ProfileScreen} className='help-image'/>
                </div>
                
                <div className='help-image-wrapper'>
                    <img src={EditProfileScreen} className='help-image'/>
                </div>
               
                <div className='help-image-wrapper'>
                    <img src={MatchesScreen} className='help-image'/>
                </div>
            </div>
        </div>
    );
}

export default Help;