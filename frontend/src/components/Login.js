import React , { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();

  // Form submit handler
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
    <div className='login-wrapper'>
      <div className= 'login-banner'>
        <h1>GMU STUDY BUDDY</h1>
        <h3>...Tinder, but for GMU students looking for study partners ;)</h3>
      </div>
      <div className= 'login-title'>
        <h1>Login or Register:</h1>
      </div>
      <div className = 'login-wrapper'>
        <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input type="email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
              <button type="submit">Login</button>
              <button type="submit">Register</button>
            </div>
          </form>
      </div>
    </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}