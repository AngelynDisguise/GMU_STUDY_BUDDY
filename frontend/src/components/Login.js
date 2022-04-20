import React , { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Login.css';
export default function Login({setToken}) {
  const [register, setRegister] = useState(false);

  function LoginFirst() {
    const initialValues = {
      email: "",
      password: "",
    };
    
    const [response, setResponse] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
  
    function statusMessage(response){
      if (loggedIn) {
        console.log("(statusMessage) Logged in: "+loggedIn);
        return (<p className="status-message" 
        style={{color: 'blue', paddingTop: '.5em'}}
        >
          Login successful!
        </p>);
      } else {
        console.log("(statusMessage) Logged in: "+loggedIn);
        return (<p className="status-message" 
        style={{color: 'red', paddingTop: '.5em'}}
        >
          {response}
        </p>);
      }
    };
  
    function authenticate(response) {
      //response is the token
      console.log("(authenticate) Response: "+response); //doesn't work
      if (response !== "Incorrect Password!" &&
      response !== "Email not found - please register!" &&
      response !== "") {
        const userToken = JSON.stringify(response);
        localStorage.setItem('token', userToken);
        setLoggedIn(true);
        console.log("(authenticate) Logged in: "+loggedIn);
        setToken(userToken);
      }
    }
  
    async function onSubmit(data){
      try {
        //HTTP Request to post data to server
        const responseVal = await axios.post("http://localhost:3001/users/login", data);
        //Save and display response from server
        setResponse(responseVal.data); //doesn't save until after function???
        console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
        console.log("(onSubmit) Response: "+response); //doesn't work
        //Assign token if user authenticated
        authenticate(responseVal.data);
        console.log("(onSubmit) Logged in: "+loggedIn); //doesn't work
      } catch(error) {
          console.log(error);
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
            {statusMessage(response)}
          </div>
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
            setRegister(true)
          }}>
            Don't have an account?
          </button>
        </div>
      </div>
    )
  }


  //******************************************************************** */

  function Register() {
    const initialValues = {
      email: "",
      password: "",
    };
    
    const [response, setResponse] = useState("");
    const [registered, setRegistered] = useState(false);
  
    function statusMessage(response){
      if (registered) {
        console.log("(statusMessage) Registered: "+registered);
        return (<p className="status-message" 
        style={{color: 'blue', paddingTop: '.5em'}}
        >
          Registration successful!
        </p>);
      } else {
        console.log("(statusMessage) Registered: "+registered);
        return (<p className="status-message" 
        style={{color: 'red', paddingTop: '.5em'}}
        >
          {response}
        </p>);
      }
    };
  
    function authenticate(response) {
      //response is the token
      console.log("(authenticate) Response: "+response); //doesn't work
      if (response !== "User already exists!" &&
      response !== "") {
        const userToken = JSON.stringify(response);
        localStorage.setItem('token', userToken);
        setRegistered(true);
        console.log("(statusMessage) Registered: "+registered);
        setToken(userToken);
      }
    }
  
    async function onSubmit(data){
      try {
        //HTTP Request to post data to server
        const responseVal = await axios.post("http://localhost:3001/users/register", data);
        //Save and display response from server
        setResponse(responseVal.data); //doesn't save until after function???
        console.log("(onSubmit) ResponseVal: "+responseVal.data); //works
        console.log("(onSubmit) Response: "+response); //doesn't work
        //Assign token if user authenticated
        authenticate(responseVal.data);
        console.log("(statusMessage) Registered: "+registered);
      } catch(error) {
          console.log(error);
      }
    };
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email address.')
      .matches(/@gmu.edu/, 'Must be a GMU email address (i.e. student@gmu.edu)')
      .required('GMU email is required.'),
      password: Yup.string()
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
            <h1>Register:</h1>
            {statusMessage(response)}
          </div>
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
              <button type="submit">Register</button>
            </Form>
          </Formik>
          <button onClick={ () => {
              setRegister(false)
            }}>
              Already have an account?
          </button>
        </div> 
      </div>
    )
  }

  //******************************************************************** */

  if(register){
    console.log("Register");
    return (
      Register()
      );
  } else {
    console.log("LoginFirst");
    return (
      LoginFirst()
      );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  // setRegister: PropTypes.func.isRequired
};
