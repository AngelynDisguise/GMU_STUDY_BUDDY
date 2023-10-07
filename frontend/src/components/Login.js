import React , { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Auth.css';

export default function Login(props) {
    const initialValues = {
        email: "",
        password: "",
    };

    const [response, setResponse] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    function statusMessage(response){
        if (loggedIn) {
        //console.log("(statusMessage) Logged in: "+loggedIn);
        return (<p className="status-message" 
        style={{color: 'blue', paddingTop: '.5em'}}
        >
            Login successful!
        </p>);
        } else {
        //console.log("(statusMessage) Logged in: "+loggedIn);
        return (<p className="status-message" 
        style={{color: 'red', paddingTop: '.5em'}}
        >
            {response}
        </p>);
        }
    };

    function authenticate(response, data) {
        //response is the token
        //console.log("(authenticate) Response: "+response); //doesn't work
        if (response !== "Incorrect Password!" &&
        response !== "Email not found - please register!" &&
        response !== "") {
            const userToken = JSON.stringify(response);
            setLoggedIn(true);
            console.log("(authenticate) email: ", data.email);
            props.setUserEmail(data.email);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('token', userToken);
            props.setToken(userToken);
        }
    }

    async function onSubmit(data){
        try {
            console.log("http://" + process.env.REACT_APP_DBHOST + ":" + process.env.REACT_APP_DBPORT + "/users/login");

            //HTTP Request to post data to server
            const responseVal = await axios.post("http://" + process.env.REACT_APP_DBHOST + ":" + process.env.REACT_APP_DBPORT + "/users/login", data);
            //const responseVal = await axios.post("https://gmu-study-buddy.duckdns.org/users/login", data);
            //Save and display response from server
            setResponse(responseVal.data); //doesn't save until after function???
            console.log("(onSubmit) ResponseVal: "+responseVal.data);
            //Assign token if user authenticated
            authenticate(responseVal.data, data);
        } catch(error) {
            console.log("(onSubmit) Error: "+error);
        }
    };

    const validationSchema = Yup.object().shape({
        email: 
        Yup.string()
        .email('Invalid email address.')
        .matches(/@gmu.edu/, 'Must be a GMU email address (i.e. student@gmu.edu)')
        .required('GMU email is required.'),
        password: 
        Yup.string()
        .min(5, 'Password must be 5-15 characters.')
        .max(15, 'Password must be 5-15 characters.')
        .required('Password is required.')
    });

    return(
        <div className='login-wrapper'>
            <div className= 'login-banner'>
                <h1>GMU STUDY BUDDY</h1>
                <h3>... a Tinder-like social media app for Mason students looking for study buddies!</h3>
            </div>
            <div className = 'login-wrapper'>
                <div className= 'login-title'>
                    <h1>Login:</h1>
                </div>
                {statusMessage(response)}
                <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
                >
                    <Form className = 'form-container'>
                        <div className='email-container'>
                            <label>Email: </label>
                            <Field 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="{student@gmu.edu}"
                            />
                        </div>
                        <ErrorMessage className="err" name="email" component="span" />
                        <div className= 'password-container'>
                            <label>Password: </label>
                            <Field 
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="{password}" />
                        </div>
                        <ErrorMessage className="err" name="password" component="span" />
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
                <button onClick={ () => {
                props.setRegister(true)
                }}>
                Don't have an account?
                </button>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
    setRegister: PropTypes.func.isRequired
};