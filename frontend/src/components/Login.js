import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { axios } from 'axios';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import '../styles/Login.css';

// async function loginUser(credentials) {
//   return fetch('http://localhost:3001/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
// }

export default function Login({ setToken }) {
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();

  // Token handler
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password
  //   });
  //   setToken(token);
    // console.log(token);
  //}

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/users/login', data).then((response) => {
    console.log(data);
    });
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
        <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit} 
          validationSchema={validationSchema}
          >
          <Form className = 'form-container'>
            <div className='email-container'>
              <label>Email: </label>
              <Field 
              id="input-email" 
              //type="email" 
              name="email" 
              placeholder="{student@gmu.edu}"
              />
            </div>
            <ErrorMessage name="email" component="span" />
            <div className= 'password-container'>
              <label>Password: </label>
              <Field 
              id="input-password" 
              //type="password" 
              name="password" 
              placeholder="{password}" />
            </div>
            <ErrorMessage name="password" component="span" />
            <div className='login-button-container'>
              <button type="submit">Login</button>
            </div>
          </Form>
        </Formik>
        <Link to= '/register'>
          <button>Don't have an account?</button>
        </Link>
      </div>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }