import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Register from './Register';
import '../styles/Auth.css';

export default function Auth(props) {
    const [register, setRegister] = useState(false);

    if (register) {
        console.log("Register");
        return (
            <Register 
              setToken={props.setToken} 
              setUser={props.setUser} 
              setRegister={setRegister}
            />
        );
    } else {
        console.log("Login");
        return (
            <Login
            setToken={props.setToken} 
            setUser={props.setUser} 
            setRegister={setRegister}
            />
        );
    }
}

Auth.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};