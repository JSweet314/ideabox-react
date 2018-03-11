import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker.js';
import './styles/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
