import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This file can be ignored, please work in ./components/App.jsx
 */

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include application component.
import { AppWithBrowserRouter } from './components/index.js';

ReactDOM.render(
  <React.StrictMode>
    <AppWithBrowserRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
