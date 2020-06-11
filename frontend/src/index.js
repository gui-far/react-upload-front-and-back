//React...
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Render App component to public/index.html root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
