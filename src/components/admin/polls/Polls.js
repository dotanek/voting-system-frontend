import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import BackButton from '../BackButton';
import Title from '../Title';
import PollsListItem from './PollsListItem';

let Container = styled.div`
    width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 30px;
    align-items: center;
`

let PollsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
`

class Polls extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
    }

    state = {
        /*polls: [
            {id: 1, name:"test-poll-name1", date_start:"11.01.2021", date_end:"11.01.2021", active:true},
            {id: 2, name:"test-poll-name2-but-longer", date_start:"12.02.2021", date_end:"11.01.2021", active:true},
            {id: 3, name:"test3", date_start:"21.03.2021", date_end:"11.01.2021", active:false},
            {id: 4, name:"test-poll-name4", date_start:"22.04.2021", date_end:"11.01.2021", active:false},
            {id: 5, name:"test-poll-name55555", date_start:"31.05.2020", date_end:"11.01.2021", active:true},
            {id: 6, name:"test-poll-name55555", date_start:"31.05.2020", date_end:"11.01.2021", active:true},
        ]*/
    }

    renderListItems = () => {
        if (!this.state.polls) {
            return "Wczytywanie..."
        }

        if (this.state.polls?.length === 0) {
            return "Brak."
        }

        return this.state.polls?.map(p => { 
                let dateEnd = moment(p.dateTo, 'YYYY-M-DD HH:mm:ss');
                let dateToday = moment();
                p.active = !dateToday.isAfter(dateEnd);
                return (
                    <PollsListItem key={p.electionId} poll={p}/>
                )
            }
        );
    }

    componentDidMount = () => {
        const headers = {
            authToken: this.props.auth.getToken()
        }

        axios.get('https://localhost:5001/get_elections', { headers })
            .then(res => {
                console.log(res.data)
                this.setState({polls:res.data.elections});
            })
            .catch(e => {
                if (e.response) {
                    console.log(e.response);
                }
            })
    }

    render() { 
        return (
            <React.Fragment>
                <Title text="Lista głosowań:"/>
                <Container>
                    <PollsList>
                        {this.renderListItems()}
                    </PollsList>
                </Container>
                <BackButton linkTo="/admin" />
            </React.Fragment>
        );
    }
}
 
export default Polls;