import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

