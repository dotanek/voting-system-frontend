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

class Admin extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <Router>
                    <Switch>
                        <Route exact path="/admin" component={Main}/>
                        <Route exact path="/admin/polls-view" component={Polls}/>
                        <Route exact path="/admin/polls-view/:id" component={Poll}/>
                        <Route path="/admin/polls-add" component={Add}/>
                    </Switch>
                </Router>
            </Container>
        );
    }
}
 
export default Admin;