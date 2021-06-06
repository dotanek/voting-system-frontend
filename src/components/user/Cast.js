import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

let Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    align-items: center;
`

let VoteButton = styled.div`
    margin-top: 10px;
    display: flex;
    width: 80%;
    padding: 10px;
    align-items: center;
    justify-content: center;
    
    background-color: #5EB638;
    color: white;
    font-weight: 600;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;

        background-color: #448329;
    }
`

let BackButton = styled(VoteButton)`
    width: 60%;
    background-color: #2e80dd;
    font-size: 13px;


    &:hover {
        background-color: #1F5694;
    }
`

let VoteItem = styled.div`
    width: calc(100% - 20px);
    color: #303030;
    margin-bottom: 10px;
    padding: 10px;
    background-color: ${props => props.isactive ? "#7CC6EB" : "rgba(255,255,255,0.8);"};

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #ABF572;
    }
`

class Cast extends Component {
    state = {}

    onClickVoteItem = (c) => {
        this.setState({selected_item:c});
    }

    onClickBackButton = () => {
        window.location.href = "/entry/user";
    }

    onClickVoteButton = () => {
        if (this.state.selected_item === "") {
            return alert("Któraś z opcji musi być zaznaczona.");
        }

        let candidate_id = this.state.poll_data.candidates.indexOf(this.state.selected_item);
        
        if (candidate_id === -1) {
            return alert("Niepoprawny wybór.");
        }

        const voteData = JSON.parse(localStorage.getItem("voteData"));
        console.log(candidate_id)

        let data = voteData.request_data;
        data.candidateId = candidate_id;

        console.log(data);

        axios.post('https://localhost:5001/add_vote', data)
        .then(res => {
            console.log(res.data);
            alert("Pomyślnie zagłosowano.")
            localStorage.removeItem("voteData");
            window.location.href = "/entry/user";
        })
        .catch(e => {
            if (e.response) {
                console.log(e.response);
            }
            alert("Wystąpił problem z głosowaniem.");
        })
    }

    componentDidMount = () => {
        const voteData = JSON.parse(localStorage.getItem("voteData"));

        console.log(voteData);

        let poll_data = voteData.poll_data;
        this.setState({poll_data,selected_item:""});
    }

    renderVote() {
        if (!this.state.poll_data) {
            return "Wczytywanie...";
        }

        return (
            <React.Fragment>
                <h3>{this.state.poll_data.title}</h3>
                {
                    this.state.poll_data.candidates.map(c => {
                    return (
                        <VoteItem key={c} isactive={this.state.selected_item == c ? 1 : 0} onClick={() => this.onClickVoteItem(c)}>{c}</VoteItem>
                    ) 
                    })
                }
                <VoteButton onClick={this.onClickVoteButton}>Zagłosuj</VoteButton>
            </React.Fragment>
        );
    }

    render() { 
        return (
            <Container>
                {this.renderVote()}
                <BackButton onClick={this.onClickBackButton}>Powrót</BackButton>
            </Container>
        );
    }
}
 
export default Cast;