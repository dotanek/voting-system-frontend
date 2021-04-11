import React, { Component } from 'react';
import styled from 'styled-components';

import BackButton from '../BackButton';
import Title from '../Title';
import PollsListItem from './PollsListItem';

let Container = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center;
`

let PollsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

class PollsView extends Component {
    state = {
        polls: [
            {id: 1, name:"test-poll-name1", date:"11.01.2021", active:true},
            {id: 2, name:"test-poll-name2", date:"12.02.2021", active:true},
            {id: 3, name:"test-poll-name3", date:"21.03.2021", active:false},
            {id: 4, name:"test-poll-name4", date:"22.04.2021", active:false},
            {id: 5, name:"test-poll-name5", date:"31.05.2020", active:true}
        ]
    }

    renderListItems = () => {
        return this.state.polls.map(
            p => (
                <PollsListItem key={p.id} poll={p}/>
            )
        );
    }

    render() { 
        return (
            <React.Fragment>
                <Title text="Twoje głosowania:"/>
                <Container>
                    <PollsList>
                        <PollsListItem isHeader="true" />
                        {this.renderListItems()}
                    </PollsList>
                </Container>
                <BackButton linkTo="/admin" />
            </React.Fragment>
        );
    }
}
 
export default PollsView;