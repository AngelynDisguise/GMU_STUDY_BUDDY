import React from 'react';
import { useParams } from 'react-router-dom'

function MatchUser() {

    let { user } = useParams();
    
    return(
        <div className='wrapper'>
            <div className='mheader'>
                <h1>User info</h1>
            </div>
            
            <div className='name'>
                <h2>Name: {user}</h2>
            </div>

            <div className='gender'>
                <h3>Gender:</h3>
            </div>
            
            <div className='major'>
                <h3>Major:</h3>
            </div>
            
            <div className='age'>
                <h3>Age:</h3>
            </div>
        </div>
    );
}

export default MatchUser;