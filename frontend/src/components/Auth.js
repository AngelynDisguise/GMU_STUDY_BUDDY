import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Register from './Register';
import '../styles/Auth.css';

export default function Auth(props) {
    //register: switches between login and register
    const [register, setRegister] = useState(false);

    if (register) {
        console.log("Register");
        return (
            <Register 
                setToken={props.setToken} 
                setUserEmail={props.setUserEmail} 
                setRegister={setRegister} 
            />
        );
    } else {
        console.log("Login");
        return (
            <Login
            setToken={props.setToken} 
            setUserEmail={props.setUserEmail} 
            setRegister={setRegister}
            />
        );
    }
}

Auth.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired
};