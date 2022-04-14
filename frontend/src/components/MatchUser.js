import React from 'react';
import { useParams } from 'react-router-dom'

function MatchUser() {

    let { user } = useParams();
    
    return(
        <div className='wrapper'>
            <h1>User info</h1>
            <h2>{user}</h2>
        </div>
    );
}

export default MatchUser;