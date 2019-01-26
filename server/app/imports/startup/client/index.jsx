/** @namespace Client */
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes.jsx';

const App = () => (
  <Routes />
);

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
}

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
