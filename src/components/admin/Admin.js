import React, { Component } from 'react';
import styled from 'styled-components';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Main from './main/Main';
import Polls from './polls/Polls';
import Poll from './poll/Poll';
import Add from './add/Add';

let Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
`

const RouteWithProps = ({component: Component, auth, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} auth={auth} />
        }}
      />
    );
  }

class Admin extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <Router>
                    <Switch>
                        <RouteWithProps exact path="/admin" component={Main} auth={this.props.auth}/>
                        <RouteWithProps exact path="/admin/polls-view" component={Polls} auth={this.props.auth}/>
                        <RouteWithProps exact path="/admin/polls-view/:id" component={Poll} auth={this.props.auth}/>
                        <RouteWithProps path="/admin/polls-add" component={Add} auth={this.props.auth}/>
                    </Switch>
                </Router>
            </Container>
        );
    }
}
 
export default Admin;