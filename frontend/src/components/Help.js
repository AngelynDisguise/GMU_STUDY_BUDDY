import React from 'react';
import '../styles/Help.css';

//images
import HomeScreen from '../images/home.png';
import SwipeRight from '../images/swright.png';
import SwipeLeft from '../images/swleft.png';
import ProfileScreen from '../images/profile.png';
import EditProfileScreen from '../images/edprofile.PNG';
import MatchesScreen from '../images/matches.png';


function Help(){
    
    return(
        <div className='help-wrapper'>
            <div className='help-header'>
                <h2>Help Page</h2>
            </div>

            <div className='help-body'>
                <div className='help-item'>
                    <h3>Welcome to the George Mason University Study Buddy App!</h3>
                    <p>Let's get started!</p>
                </div>              
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={HomeScreen} className='help-image'/>
                    </div>
                    
                    <ul>
                        <li>After logging in, you'll be greeted with the home screen</li>
                        <li>This is where you'll be able to look through profiles and decide who you'd like to study with!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={SwipeLeft} className='help-image'/>
                    </div>
                    
                    <ul>
                        <li>Simply swipe left to reject!</li>
                    </ul>
                    <p></p>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={SwipeRight} className='help-image'/>
                    </div>

                    <ul>
                        <li>Or swipe right to accept!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={ProfileScreen} className='help-image'/>
                    </div>
                    
                    <ul>
                        <li>This is where you may view information about your own profile!</li>
                        <li>Click on the pencil icon to edit</li>
                    </ul>
                    
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={EditProfileScreen} className='help-image'/>
                    </div>

                    <ul>
                        <li>Here is where you can edit your profile. Simply enter the information you'd like to change, and hit submit!</li>
                        <li>Any field left blank will remain unchanged!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={MatchesScreen} className='help-image'/>
                    </div>

                    <ul>
                        <li>This is the matches screen, displaying the contact information of your matches, so you may contact them and set up a time to study</li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default Help;