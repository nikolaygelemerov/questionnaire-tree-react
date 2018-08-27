import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
const basename = '/admin/advisor2.php';

const app = (
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
