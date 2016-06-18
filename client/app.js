import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';


const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
};

render();
