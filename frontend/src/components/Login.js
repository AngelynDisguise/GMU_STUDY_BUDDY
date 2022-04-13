import React , { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import Register from './Register';
import '../styles/Login.css';

//export default function Login({setToken}, {setRegister}) {
export default function Login({setToken}) {
  const initialValues = {
    email: "",
    password: "",
  };
  
  const [response, setResponse] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  <Routes>
    <Route path="/register" element={<Register />} />
  </Routes>

  // useEffect(() => {
  //   console.log("(useEffect) Response: "+response); //doesn't work
  //   //Assign token if user authenticated
  //   authenticate(response);
  //   console.log("(useEffect) Logged in: "+loggedIn); //doesn't work
  //   if(loggedIn){
  //     //Redirect to home page
  //     <App />
  //   }
  // }, []);


  function statusMessage(response){
    // if (response === "Incorrect Password!" ||
    //     response === "Email not found - please register!") {
    if (loggedIn) {
      console.log("(statusMessage) Logged in: "+loggedIn);
      //authenticate(response);
      return (<p className="status-message" 
      style={{color: 'blue', paddingTop: '.5em'}}
      >
        Login successful!
      </p>);
      // return <Navigate to="/" />;
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
      //return <Navigate to="/" />;
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
      // if(loggedIn){
      //   //Redirect to home page
      //   <Link to="/"/>
      // }
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
            <ErrorMessage name="email" component="span" />
            <div className= 'password-container'>
              <label>Password: </label>
              <Field 
              id="password" 
              type="password" 
              name="password" 
              placeholder="{password}" />
            </div>
            <ErrorMessage name="password" component="span" />
            <button type="submit">Login</button>
          </Form>
        </Formik>
        <Link to= '/register'>
          {/* <button onClick={setRegister(true)}> */}
          <button>
            Don't have an account?
          </button>
        </Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  // setRegister: PropTypes.func.isRequired
};