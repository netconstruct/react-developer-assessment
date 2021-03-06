import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This file can be ignored, please work in ./components/App.jsx
 */

// Include mock API.
import './mock';

// Include styles.
import './styles/reset.css';
import './styles/globals.css';
import './styles/index.css';

// Include application component.
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
