import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function logOut() {
    localStorage.removeItem('token');
    console.log("User has logged out...");
    <Link to="/" />
    window.location.assign("/");
    //window.location.reload();
}

function Profile(){
    return(
        <div className="wrapper">
            <h2>Account Information</h2>
            <button type="button" onClick={logOut}>Logout</button>
            <button type="button">Deactivate Account</button>
        </div>
    );
}

export default Profile