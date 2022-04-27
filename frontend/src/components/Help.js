import React from 'react';
import '../styles/Help.css';

//images

//Screens
import HomeScreen from '../images/home.png';
import SwipeRight from '../images/swright.png';
import SwipeLeft from '../images/swleft.png';
import ProfileScreen from '../images/profile.png';
import EditProfileScreen from '../images/edprofile.PNG';
import MatchesScreen from '../images/matches.png';

//Buttons
import BackButton from '../images/backButton.png';
import HelpButton from '../images/helpButton.png';
import HomeButton from '../images/homeButton.png';
import MatchesButton from '../images/matchesButton.png';
import ProfileButton from '../images/profileButton.png';
import ProfileEdit from '../images/profileEditButton.png';
import ProfileInfo from '../images/profileInfoButton.png';
import Unmatch from '../images/unmatch.png';



function Help(){
    
    return(
        <div className='help-wrapper'>
            <div className='help-header'>
                <h2>Help Page</h2>
            </div>

            <div className='help-body'>
                <div className='help-intro'>
                    <h3>Welcome to the George Mason University Study Buddy App!</h3>
                    <h4>Let's get started!</h4>
                </div>              
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={HomeScreen} className='help-image' alt='home screen example'/>
                    </div>
                    
                    <ul>
                        <li>After logging in, you'll be greeted with the home screen</li>
                        <li>This is where you'll be able to look through profiles and decide who you'd like to study with!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper' >
                        <img src={SwipeLeft} className='help-image' alt='swipe left example'/>
                    </div>
                    
                    <ul>
                        <li>Simply swipe left to reject!</li>
                    </ul>
                    <p></p>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={SwipeRight} className='help-image' alt='swipe right example'/>
                    </div>

                    <ul>
                        <li>Or swipe right to accept!</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={ProfileInfo} className='help-button' alt='profile screen example'/>
                    </div>

                    <ul>
                        <li>Click on this icon for more info about the person</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={HomeButton} className='help-button' alt='home button circled'/>
                    </div>

                    <ul>
                        <li>This button will always navigate back to the homepage</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={MatchesButton} className='help-button' alt='matches button circled'/>
                    </div>

                    <ul>
                        <li>This button brings you to the matches screen</li>
                    </ul>
                </div>   

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={MatchesScreen} className='help-image' alt='matches screen example'/>
                    </div>

                    <ul>
                        <li>This is the matches screen, displaying the contact information of your matches, so you may contact them and set up a time to study</li>
                        <li>Any user you chose to swipe right on will appear here!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={Unmatch} className='help-button' alt='unmatch button circled'/>
                    </div>

                    <ul>
                        <li>Click this button to remove a user from your matches list!</li>
                    </ul>
                </div>
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={ProfileButton} className='help-button' alt='profile screen button circled'/>
                    </div>

                    <ul>
                        <li>This button will navigate you to your Profile Page</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={ProfileScreen} className='help-image' alt='profile screen example'/>
                    </div>
                    
                    <ul>
                        <li>This is where you may view information about your own profile!</li>
                        
                    </ul>
                    
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={ProfileEdit} className='help-button' alt='profile edit screen button circled'/>
                    </div>

                    <ul>
                        <li>Click on the pencil icon to edit</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={EditProfileScreen} className='help-image' alt='profile edit screen example'/>
                    </div>

                    <ul>
                        <li>Here is where you can edit your profile. Simply enter the information you'd like to change, and hit submit!</li>
                        <li>Any field left blank will remain unchanged!</li>
                    </ul>
                </div>                
                
                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={BackButton} className='help-button' alt='back button circled'/>
                    </div>

                    <ul>
                        <li>If you ever navigate away from the homepage, this button will take you back to the previous page</li>
                    </ul>
                </div>

                <div className='help-item'>
                    <div className='help-image-wrapper'>
                        <img src={HelpButton} className='help-button' alt='help button circled'/>
                    </div>

                    <ul>
                        <li>If you ever need help, this button will always be at the bottom of the page!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Help;