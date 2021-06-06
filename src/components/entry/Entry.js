import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

let Container = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
`

let InputWindow = styled.div `
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
`

let WindowLabel = styled.div `
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid white;
`

let InputContainer = styled.div `
    width: 100%;
    height: 60%;
    padding-top: 10px;
`

let InputField = styled.input `
    width: calc(100% - 16px);
    padding: 6px;
    margin: 0;
    text-decoration: none;
    outline: none;
    margin-top: 10px;
    border: 2px solid white;
    background: none;
    color: white;

    transition: 0.2s ease-in-out;

    &:focus {
        border: 2px solid #2e80dd;
    }
`

let InputButton = styled.div `
    width: calc(100% - 16px);
    padding: 8px;
    display: flex;
    margin-top: 20px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #2e80dd;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #1F5694;
    }
`

let EntrySwapLabel = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
    text-decoration: underline;
`


class Entry extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
    }

    state = {
        valueInputFieldAdminCode:"",
        valueInputFieldAdminPassword:"",
        valueInputFieldUserAddress:"",
        valueInputFieldUserVoter:"",
        valueInputFieldUserPassword:"",
        valueInputFieldUserKey:""
    }

    onChangeInputFieldAdminCode = (e) => {
        this.setState({ valueInputFieldAdminCode: e.target.value });
    }

    onChangeInputFieldAdminPassword = (e) => {
        this.setState({ valueInputFieldAdminPassword: e.target.value });
    }



    onClickInputButtonUserCheck = () => {
        const data = {
            auth: {
                accountAddress: this.state.valueInputFieldUserAddress,
                password: this.state.valueInputFieldUserPassword
            },
            keyAdr: this.state.valueInputFieldUserKey,
            voter: this.state.valueInputFieldUserVoter
        }
        
        console.log(data);

        axios.post('https://localhost:5001/check_vote', data)
        .then(res => {
            console.log(res.data);
            if (res.data.voted) {
                alert("Głos związany z tym kodem został pomyślnie oddany.");
            } else {
                alert("Kod nie został jeszcze wykorzystany.");
            }
        })
        .catch(e => {
            if (e.response) {
                console.log(e.response);
            }
            alert("Niepoprawne dane.");
        })
    }

    onClickInputButtonUserVote = (e) => {
        const data = {
            auth: {
                accountAddress: this.state.valueInputFieldUserAddress,
                password: this.state.valueInputFieldUserPassword
            },
            keyAdr: this.state.valueInputFieldUserKey,
            voter: this.state.valueInputFieldUserVoter
        }
        
        console.log(data);

        axios.post('https://localhost:5001/start_vote', data)
        .then(res => {
            console.log(res.data);
            
            let voteData = {
                request_data: data,
                poll_data: {
                    title: res.data.title,
                    candidates: res.data.candidates
                }
            }

            localStorage.setItem("voteData", JSON.stringify(voteData));
            window.location.href = "/user/vote-cast";
        })
        .catch(e => {
            if (e.response) {
                console.log(e.response);
            }
            alert("Niepoprawne dane.");
        })
    }

    onChangeInputUserAddress = (e) => {
        this.setState({valueInputFieldUserAddress:e.target.value});
    }
    onChangeInputUserPassword = (e) => {
        this.setState({valueInputFieldUserPassword:e.target.value});
    }
    onChangeInputUserVoter = (e) => {
        this.setState({valueInputFieldUserVoter:e.target.value});
    }
    onChangeInputUserKey = (e) => {
        this.setState({valueInputFieldUserKey:e.target.value});
    }

    onClickInputButtonAdmin = () => {
        const data = {
            accountAddress: this.state.valueInputFieldAdminCode,
            password: this.state.valueInputFieldAdminPassword
        }

        axios.post('https://localhost:5001/authenticate', data)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("authToken", JSON.stringify(res.data.authToken));
            window.location.href = "/admin";
        })
        .catch(e => {
            if (e.response) {
                console.log(e.response);
            }
            alert("Nie udało się zalogować.");
        })
    }

    renderUserWindow = () => {
        return(
            <InputWindow>
                <WindowLabel>Wprowadź dane aby zagłosować:</WindowLabel>
                <InputContainer>
                    <InputField placeholder="Adres" value={this.state.valueInputFieldUserAddress} onChange={this.onChangeInputUserAddress}/>
                    <InputField placeholder="Hasło" type="password" value={this.state.valueInputFieldUserPassword} onChange={this.onChangeInputUserPassword}/>
                    <InputField placeholder="Pesel" value={this.state.valueInputFieldUserVoter} onChange={this.onChangeInputUserVoter}/>
                    <InputField placeholder="Klucz" value={this.state.valueInputFieldUserKey} onChange={this.onChangeInputUserKey}/>
                    <InputButton onClick={this.onClickInputButtonUserVote}>Zagłosuj</InputButton>
                    <InputButton style={{marginTop:"10px"}} onClick={this.onClickInputButtonUserCheck}>Sprawdź głos</InputButton>
                    <EntrySwapLabel>
                        <Link to="/entry/admin">
                            Autoryzuj jako administrator.
                        </Link>
                    </EntrySwapLabel>
                </InputContainer>
            </InputWindow>
        );
    }

    renderAdminWindow = () => {
        return(
            <InputWindow>
                <WindowLabel>Wprowadź hasło administratora:</WindowLabel>
                <InputContainer>
                    <InputField onChange={this.onChangeInputFieldAdminCode} value={this.state.valueInputFieldAdminCode} placeholder="Adres" type="text"/>
                    <InputField onChange={this.onChangeInputFieldAdminPassword} value={this.state.valueInputFieldAdminPassword} placeholder="Hasło" type="password"/>
                    <InputButton onClick={this.onClickInputButtonAdmin}>Zaloguj</InputButton>
                    <EntrySwapLabel>
                        <Link to="/entry/user">
                            Powrót do głosowania.
                        </Link>
                    </EntrySwapLabel>
                </InputContainer>
            </InputWindow>
        );
    }


    render() {
        if (this.props.auth.isAuthenticated()) {
            return <Redirect to = '/admin' />
        }

        return (
            <Container>
                <Router>
                    <Switch >
                        <Route path = "/entry/user" > { this.renderUserWindow() }</Route>
                        <Route path = "/entry/admin" > { this.renderAdminWindow() }</Route>
                    </Switch>
                </Router> 
            </Container>
        );
    }
}

export default Entry;