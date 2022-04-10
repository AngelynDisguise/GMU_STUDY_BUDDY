import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Login.css';

export default function Register({ setToken }) {
  const initialValues = {
    email: "",
    password: "",
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

  // const onSubmit = (data) => {
  //   axios.post("http://localhost:3001/users/register", data);
  //   console.log(response);
  // };
  //UNHANDLED ERROR

  // const onSubmit = () => {
  //   const data = {
  //     "email": "ex@gmu.edu",
  //     "password": "password",
  //   };
  //   try {
  //     axios.post("http://localhost:3001/users/register", data).then((response) => {
  //     console.log(response);
  //   });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }; //TypeError: Cannot read properties of undefined (reading 'post')
  
  const onSubmit = async (data) => {
    if(data === undefined) {
      console.log("undefined data");
    }
    else {
      console.log(data); //works!
    }
    try {
      const response = await axios.post("http://localhost:3001/users/register", data);
      if(response === undefined){
        console.log("undefined response");
      } else {
        console.log("it's alright...");
      }
      console.log(response);
    } catch(error) {
        console.log(error);
    }
  }; //TypeError: Cannot read properties of undefined (reading 'post')

  return(
    <div className='login-wrapper'>
      <div className= 'login-banner'>
        <h1>GMU STUDY BUDDY</h1>
        <h3>... a Tinder-like social media app for Mason students looking for study buddies!</h3>
      </div>
      <div className = 'login-wrapper'>
        <div className= 'login-title'>
          <h1>Register:</h1>
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
            <div className='login-button-container'>
              <button type="submit">Register</button>
            </div>
          </Form>
        </Formik>
        <Link to= '/login'>
          <button>Already have an account?</button>
        </Link>
      </div>
    </div>
  )
}