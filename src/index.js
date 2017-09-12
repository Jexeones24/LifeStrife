import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

const MyApp = () =>{
  return(
    <Router>
      <App />
    </Router>
  )
}


ReactDOM.render(
  <MyApp />, document.getElementById('root'));
registerServiceWorker();
