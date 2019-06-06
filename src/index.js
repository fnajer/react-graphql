import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';

import App from './components/App';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <Router>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </React.Fragment>
      
  </Router>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();

if (module.hot)
  module.hot.accept();
