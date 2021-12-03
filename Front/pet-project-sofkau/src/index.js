import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.render(
  <Auth0Provider
    domain="dev-n161a0hm.us.auth0.com"
    clientId="irjMgm1WTdys9IwoyJ19gOE6fg7ggr5z"
    redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

