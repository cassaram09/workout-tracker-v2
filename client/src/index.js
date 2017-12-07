import React from 'react';
import ReactDOM from 'react-dom';
import App from '/src/app/app';
import registerServiceWorker from './registerServiceWorker';
import '/src/assets/styles/styles.min.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
