import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainGraph from './MainGraph';
import Navigation from './Navigation';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <MainGraph />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
  document.getElementById('navbar')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
