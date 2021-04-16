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

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
        <Switch>
          <Route path={["/entry/user", "/entry/admin"]} component={Entry}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/user" component={User}/>
          <Redirect to="/entry/user" />
        </Switch>
      </Router>
    );
  }
}
 
export default App;