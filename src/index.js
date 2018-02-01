import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import{Router,browserHistory} from 'react-router';
import routes1 from './routes';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../public/dataTable/fixedColumns.min.js';

ReactDOM.render(
  //<App />,
  <Router history={browserHistory} routes={routes1} />,
   document.getElementById('root')
);
