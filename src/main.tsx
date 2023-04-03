import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {UserContext}  from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContext>
      <App />
    </UserContext>
    </BrowserRouter>
  </React.StrictMode>,
)
