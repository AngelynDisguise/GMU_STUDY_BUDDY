import React from "react";
import '../styles/Profile.css';

function Profile(){
    return(
        <div className="wrapper">
            <h2>Account Information</h2>
            
            <button type="button">Logout</button>
            <button type="button">Deactivate Account</button>
        </div>
    );
}

export default Profile