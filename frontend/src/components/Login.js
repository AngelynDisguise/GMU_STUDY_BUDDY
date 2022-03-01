import React from 'react';

import '../styles/Login.css';

export default function Login() {
  return(
    <form className='wrapper'>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
