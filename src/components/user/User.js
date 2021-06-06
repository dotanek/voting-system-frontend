import React, { Component } from 'react';
import styled from 'styled-components';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Cast from './Cast.js';

let Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
`

class UserView extends Component {
    state = {  }

    constructor(props) {
        super(props);
        const voteData = localStorage.getItem("voteData");
        if (!voteData) {
            window.location.href = "/entry";
        }
    }

    render() { 
        return (
            <Container>
                <Router>
                    <Switch>
                        <Route exact path="/user/vote-cast" component={Cast} />
                    </Switch>
                </Router>
            </Container>
        );
    }
}
 
export default UserView;