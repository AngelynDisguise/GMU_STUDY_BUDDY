import React , { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import Register from './Register.js'

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    // console.log(token);
  }

  return(
    <form className='wrapper' onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      <label>
        <br></br>
          <p>New user? Click here!</p>
        </label>
      <div>       
        <form action="./register">
          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </form>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}