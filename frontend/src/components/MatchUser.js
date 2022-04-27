import React from 'react';
import { useParams } from 'react-router-dom';

function MatchUser(props) {
    /* User Variables */
    let { name } = useParams();
    const gender = "";
    const major = "";
    const age = "";
    
    return(
        <div className='matchuser-wrapper'>
            <div className='mu-header'>
                <h2>User info</h2>
            </div>
            
            <div className='mu-info'>
                <div className='mu-name'>
                    <h2>Name: {name}</h2>
                </div>

                <div className='mu-gender'>
                    <h3>Gender: {gender}</h3>
                </div>
                
                <div className='mu-major'>
                    <h3>Major: {major}</h3>
                </div>
                
                <div className='mu-age'>
                    <h3>Age: {age}</h3>
                </div>
            </div>
            
        </div>
    );
}

export default MatchUser;