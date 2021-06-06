import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Entry from './components/entry/Entry';
import Admin from './components/admin/Admin';
import User from './components/user/User';
import auth from './components/Auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} auth={auth}/>
        } else {
          return <Redirect to='/entry' />
        }
      }}
    />
  );
}

const UnprotectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} auth={auth}/>
      }}
    />
  );
}

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
        <Switch>
          <UnprotectedRoute path={["/entry/user", "/entry/admin"]} component={Entry}/>
          <ProtectedRoute path="/admin" component={Admin}/>
          <UnprotectedRoute path="/user/vote-cast" component={User}/>
          <Redirect to="/entry/user" />
        </Switch>
      </Router>
    );
  }
}
 
export default App;