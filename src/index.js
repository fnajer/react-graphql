import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as  Router, Switch, Route, Redirect } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';

import App from './components/App';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import Brews from './components/Brews';
import { getToken } from './utils';
import registerServiceWorker from './registerServiceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route render={props => (
    getToken() !== null 
      ? <Component {...props}/> 
      : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
  )}/>
);

const Root = () => (
  <Router>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route path="/:brandId" component={Brews} />
        </Switch>
      </React.Fragment>
  </Router>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();

if (module.hot)
  module.hot.accept();
