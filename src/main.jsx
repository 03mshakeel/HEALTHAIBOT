// ==============================================================
// MAIN.JSX - APPLICATION ENTRY POINT
// ==============================================================
// This file is the entry point for the React application
// It initializes React and renders the App component into the DOM
// ==============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Render the main App component into the root div
// React.StrictMode helps identify potential issues during development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
