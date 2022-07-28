import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

