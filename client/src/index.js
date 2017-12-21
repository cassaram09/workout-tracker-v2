import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import registerServiceWorker from './registerServiceWorker';

import '/src/assets/styles/styles.min.css'

import App from '/src/app/app';
import Store from '/src/app/store/store'
import history from '/src/app/utils/history'
import Resource from 'r3-library';

var resource = Resource;

Resource.setDispatch(Store.dispatch)

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
   document.getElementById('root')
);

registerServiceWorker();
