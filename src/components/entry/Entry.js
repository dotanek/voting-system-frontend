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

let Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
`

let InputWindow = styled.div`
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
`

let WindowLabel = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid white;
`

let InputContainer = styled.div`
    width: 100%;
    height: 60%;
    padding-top: 10px;
`

let InputField = styled.input`
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

let InputButton = styled.div`
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

let EntrySwapLabel = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
    text-decoration: underline;
`


class Entry extends Component {
    state = {
        valueInputFieldAdminCode:"",
        valueInputFieldAdminPassword:""
    }

    onChangeInputFieldAdminCode = (e) => {
        this.setState({valueInputFieldAdminCode:e.target.value});
    }

    onChangeInputFieldAdminPassword = (e) => {
        this.setState({valueInputFieldAdminPassword:e.target.value});
    }

    onClickInputButtonUserCheck = () => {

    }

    onClickInputButtonUserVote = () => {

    }

    onClickInputButtonAdmin = () => {
        let credentials = {
            address: this.state.valueInputFieldAdminCode,
            password: this.state.valueInputFieldAdminPassword
        }

        localStorage.setItem("credentials",JSON.stringify(credentials));
        window.location.href = "/admin";
    }

    renderUserWindow = () => {
        return(
            <InputWindow>
                <WindowLabel>Wprowadź kod oraz pesel aby zagłosować:</WindowLabel>
                <InputContainer>
                    <InputField placeholder="Pesel"/>
                    <InputField placeholder="Kod"/>
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
                    <InputField onChange={this.onChangeInputFieldAdminCode} value={this.state.valueInputFieldAdminCode} placeholder="Kod" type="text"/>
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
            return <Redirect to='/admin' />
        }

        return ( 
            <Container>
                <Router>
                    <Switch>
                        <Route path="/entry/user">
                            {this.renderUserWindow()}
                        </Route>
                        <Route path="/entry/admin">
                            {this.renderAdminWindow()}
                        </Route>
                    </Switch>
                </Router>
            </Container>
        );
    }
}
 
export default Entry;