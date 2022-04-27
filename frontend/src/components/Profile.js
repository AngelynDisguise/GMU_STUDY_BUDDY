import { IconButton } from "@material-ui/core";
import React , { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/Profile.css';
import EditIcon from '@mui/icons-material/Edit';
import Anon from '../images/anon.jpg';
import {getUserInfo, deleteUser} from '../util/UserInfo';

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    console.log("User has logged out...");
    <Link to="/" />
    window.location.assign("/");
    //window.location.reload();
}

function deactivate() {
    if(window.confirm("Are you sure you want to deactivate your account?")) {
        deleteUser(localStorage.getItem('userEmail')).then(res => {
            console.log(res);
            console.log("User has deactivated their account...");
            logOut();
        });
    }
}

/* User Info goes here, dunno what to do about a
 * profile picture just yet, though. These are
 * just placeholders
 */
// const name = "Ian";
// const email = "gmustudybuddy@gmu.edu";
// const dob = "05/24/2001";
// const gender = "M";
// const major = "CS";

function Profile(props){
    const [userFirstName, setUserFirstName] = useState("Ian");
    const [userLastName, setUserLastName] = useState("Boyd");
    const [userDOB, setUserDOB] = useState("05/25/2022");
    const [userBio, setUserBio] = useState("Example Text");
    const [userGender, setUserGender] = useState("M");
    const [userMajor, setUserMajor] = useState("CS");
    const [userClasses, setUserClasses] = useState(["CS 321",]);
    const [userPreferences, setUserPreferences] = useState([]);

    const userEmail = props.userEmail;
    //const userEmail = "example@gmu.edu";
     const pref = [];



    useEffect (() => {
        getUserInfo(userEmail).then(user => {
            if(user) {
                setUserFirstName(user.firstName);
                setUserLastName(user.lastName);
                setUserDOB(user.date);
                setUserBio(user.bio);
                setUserGender(user.gender);
                setUserMajor(user.major);
                setUserClasses(user.classesTaken);
                //setUserPreferences(user.preferences);
                user.preferences.forEach(element => {
                    //console.log(element.byAge);
                    if(element.byMajor) pref.push("Major");
                    if(element.byGender) pref.push("Gender");
                    if(element.byAge) pref.push("Age");
                    
                });
                setUserPreferences(pref);
                //console.log(pref);
            }
        });
    }, [])

    return(
        <div className="profile-wrapper">
            <div className="profile-body">
                <div className="profile-info">
                    <div className="profile-header">
                        <h2>Account Information</h2>
                    </div>
                    <div className="profile-editButton">
                            <Link to="/editprofile">
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                            </Link>
                        </div>
                    <div className='profile-pic'>
                        <img src={Anon} height="100" width="100"/>
                    </div>
                    <div className="profile-infoactions">
                        <div className="profile-info">
                            <h3>Name: {userFirstName} {userLastName}</h3>
                            <h3>Email: {userEmail}</h3>
                            <h3>Date of Birth: {userDOB}</h3>
                            <h3>Gender: {userGender}</h3>
                            <h3>Major: {userMajor}</h3>
                            <h3>Classes Taken/Taking: {userClasses}</h3>
                            <h3>Bio: {userBio}</h3>
                            <h3>Matching Preferences: {userPreferences}</h3>
                        </div>            
                        <div className="profile-actions">
                            <button type="button" onClick={logOut}>Logout</button>
                            <button type="button" onClick={deactivate}>Deactivate Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile