import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { Auth0Provider } from "@auth0/auth0-react";

import App from './App';
import './index.css';

ReactDOM.render(
  // <Auth0Provider
  //   domain="YOUR_DOMAIN"
  //   clientId="YOUR_CLIENT_ID"
  //   redirectUri={window.location.origin}
  // >
  //   <App />
  // </Auth0Provider>,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

