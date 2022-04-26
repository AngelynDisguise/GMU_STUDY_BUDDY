import { IconButton } from "@material-ui/core";
import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Profile.css';
import EditIcon from '@mui/icons-material/Edit';

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    console.log("User has logged out...");
    <Link to="/" />
    window.location.assign("/");
    //window.location.reload();
}

/* User Info goes here, dunno what to do about a
 * profile picture just yet, though. These are
 * just placeholders
 */
const name = "Ian";
const email = "ianalexboyd@gmail.com";
const dob = "01/29/2000";
const gender = "M";
const major = "cs";

function Profile(){
    return(
        <div className="profile-wrapper">
            
            <div className="profile-body">
                
                <div className="profile-info">
                    <div className="profile-header">
                        <h2>Account Information</h2>
                    </div>

                    <div className="profile-infoactions">
                        <div className="profile-info">
                            <h3>Name: {name}</h3>
                            <h3>Email: {email}</h3>
                            <h3>Date of Birth: {dob}</h3>
                            <h3>Gender: {gender}</h3>
                            <h3>Major: {major}</h3>
                        </div>            

                        <div className="profile-actions">
                            <button type="button" onClick={logOut}>Logout</button>
                            <button type="button">Deactivate Account</button>
                        </div>
                    </div>
                    
                </div>
                
                <div className="profile-editButton">
                    <Link to="/editprofile">
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                    </Link>
                </div>

            </div>
            
        </div>
    );
}

export default Profile