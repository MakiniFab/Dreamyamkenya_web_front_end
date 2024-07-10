import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Use createRoot from 'react-dom/client' instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));

// Render the App component within the root
root.render(
  <Router>
    <App />
  </Router>
);
