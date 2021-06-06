import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import BackButton from '../BackButton';


let Container = styled.div`
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
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
    width: calc(40% - 16px);
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

let GeneratedCode = styled.div`
    min-width: 150px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 11px;
    margin-bottom: 10px;
`

let Address = styled.div`
    width: 100%;
    padding: 2px;
`

let Voter = styled.div`
    width: 100%;
    padding: 2px;
    margin-bottom: 10px;
`

let Key = styled.div`
    padding: 2px;
`

class Generate extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
    }
    
    state = {
        inputAddressValue: "",
        inputVoterValue:"",
        generated: []
    }

    onChangeInputFieldAddress = (e) => {
        this.setState({inputAddressValue:e.target.value});
    }
    
    onChangeInputFieldVoter = (e) => {
        this.setState({inputVoterValue:e.target.value});
    }

    onClickButtonGenerate = () => {
        const config = {
            headers: {
                authToken: this.props.auth.getToken()
            }
        }

        let urlParts = window.location.href.split('/');
        let electionId = urlParts[urlParts.length-1];

        const data = {
            electionId,
            voterAdress: this.state.inputAddressValue,
            voter: this.state.inputVoterValue
        }

        axios.post('https://localhost:5001/generate_codes', data, config)
            .then(res => {
                console.log(res);
                console.log("halo0");
                let generated = this.state.generated;
                let voterAddress = this.state.inputAddressValue;
                let voter = this.state.inputVoterValue;
                let keys = res.data.newKeys.map(k => k.keyValue);
                generated.push({
                    voter,
                    voterAddress,
                    keys
                });
                this.setState({generated,inputAddressValue:"",inputVoterValue:""});
                console.log(this.state);
            })
            .catch(e => {
                if (e.response) {
                    console.log(e.response);
                    alert("Generowanie nie powiodło się.");
                }
            })
    }

    renderCodes = () => {
        return this.state.generated?.map(g => {
            return (
                <GeneratedCode key={g.voterAddress}>
                    <Address><b></b>Adres: {g.voterAddress}</Address>
                    <Voter>PESEL: {g.voter}</Voter>
                    {g.keys.map(k => (<Key key={k}>{k}</Key>))}
                </GeneratedCode>
            )
        });
        
        //`Adres: ${g.voterAddress}, pesel: ${g.voter}, klucz: ${g.key}`);
    }

    render() { 
        let urlParts = window.location.href.split('/');
        let electionId = urlParts[urlParts.length-1];

        return (
            <React.Fragment>
                <Container>
                    {this.renderCodes()}
                    <InputField style={{marginTop:"20px"}} value={this.state.inputAddressValue} onChange={this.onChangeInputFieldAddress} placeholder="Adres użytkownika"></InputField>
                    <InputField value={this.state.inputVoterValue} onChange={this.onChangeInputFieldVoter} placeholder="PESEL użytkownika"></InputField>
                    <InputButton onClick={this.onClickButtonGenerate}>Generuj</InputButton>
                </Container>
                <BackButton linkTo={"/admin/polls-view/"+electionId} />
            </React.Fragment>
        );
    }
}
 
export default Generate;