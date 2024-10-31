import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';  // Ensure this file exists
import App from './App';

// Create the root element using createRoot API in React 18
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the app using the new API
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
