import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Login.css';

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  
  const [statusMessage, setStatusMessage] = useState("");

  const colorMessage = (message) => {
    if (message === "Login successful!") {
      return (<p className="status-message" 
      style={{color: 'blue', paddingTop: '.5em'}}
      >
        {message}
      </p>);
    } else if(message !== ""){
      return (<p className="status-message" 
      style={{color: 'red', paddingTop: '.5em'}}
      >
        {message}
      </p>);
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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", data);
      console.log(response.data);
      setStatusMessage(response.data);
    } catch(error) {
        console.log(error);
    }
  };

  return(
    <div className='login-wrapper'>
      <div className= 'login-banner'>
        <h1>GMU STUDY BUDDY</h1>
        <h3>... a Tinder-like social media app for Mason students looking for study buddies!</h3>
      </div>
      <div className = 'login-wrapper'>
        <div className= 'login-title'>
          <h1>Login:</h1>
          {colorMessage(statusMessage)}
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
          <button>Don't have an account?</button>
        </Link>
      </div>
    </div>
  )
}