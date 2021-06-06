import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Title from '../Title';
import BackButton from '../BackButton';
import Chart from './Chart';

let Container = styled.div`
    margin-top: 20px;
    width: 500px;
    color: #202020;
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
`

let Name = styled.div`
    width: 100%;
    display: flex;
    font-size: 20px;
`

let Author = styled.div`
    width: 100%;
    display: flex;
    font-size: 15px;
`

let DateStart = styled.div`
    width: 100%;
    display: flex;
    font-size: 15px;
`

let DateEnd = styled.div`
    width: 100%;
    display: flex;
    font-size: 15px;
`

let Votes = styled.div`
    width: 100%;
    display: flex;
    font-size: 15px;
`

let Left = styled.div`
    display: flex;
    flex: 1;
    padding: 12px;
    font-weight: 600;
    justify-content: center;
`

let Right = styled.div`
    display: flex;      
    padding: 12px;
    flex: 1;
    justify-content: center;
`

let Button = styled(BackButton)`
    font-size: 10px;
    width: 160px;
`

class Poll extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
    }

    state = {
        /*poll_data: {
            name: "Some poll name",
            author: "Jakiś_admin_123",
            date_start: "11.11.2021",
            date_end: "11.11.2021",
            active: true,
            results : [
                {label:"Super long name", value:123},
                {label:"Second", value:321},
                {label:"Third", value:554},
                {label:"Fourth", value:821},
                {label:"Fifth", value:42},
                {label:"Aaa", value:411},
                {label:"Bbbb", value:32},
            ]
        }*/
    }

    componentDidMount = () => {
        const config = {
            headers: {
                authToken: this.props.auth.getToken()
            }
        }

        let urlParts = window.location.href.split('/');
        let electionId = urlParts[urlParts.length-1];

        axios.get('https://localhost:5001/get_election_details?id='+electionId, config)
            .then(res => {
                console.log(res.data);
                this.setState({
                    poll_data: {
                        name: res.data.title,
                        date_start: res.data.dateFrom.slice(0,10),
                        date_end: res.data.dateTo.slice(0,10),
                        results: res.data.results.map(r => r = { label:r.candidate,value:r.votes })
                    }
                });

                console.log(this.state.poll_data);
            })
            .catch(e => {
                if (e.response) {
                    console.log(e.response);
                }
            })
    }


    render() { 
        if (!this.state.poll_data) {
            return (
                <React.Fragment>
                    Wczytywanie...
                    <BackButton linkTo="/admin/polls-view" />
                </React.Fragment>
            );
        }

        let urlParts = window.location.href.split('/');
        let electionId = urlParts[urlParts.length-1];

        return (
            <React.Fragment>
                <Title text="Wyniki głosowania:"/>
                <Container>
                    <Name>
                        <Left>Nazwa:</Left>
                        <Right>{this.state.poll_data.name}</Right>
                    </Name>
                    <DateStart>
                        <Left>Data rozpoczęcia:</Left>
                        <Right>{this.state.poll_data.date_start}</Right>
                    </DateStart>
                    <DateEnd>
                        <Left>Data zakończenia:</Left>
                        <Right>{this.state.poll_data.date_end}</Right>
                    </DateEnd>
                    <Votes>
                        <Left>Głosy:</Left>
                        <Right>12345</Right>
                    </Votes>
                </Container>
                <Chart data={this.state.poll_data.results}/>
                <Button text="Generuj klucz" linkTo={"/admin/polls-generate/"+electionId} />
                <BackButton linkTo="/admin/polls-view" />
            </React.Fragment>
        );
    }
}
 
export default Poll;