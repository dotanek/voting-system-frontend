import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Title from '../Title';
import BackButton from '../BackButton';
import Class from './Class';

let Container = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    align-items: center;
`

let InputBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 20px;
`

let ClassBox = styled.div`
    flex-direction: column;
    display: flex;
    width: 100%;
    margin-top: 40px;
`

let ClassList = styled.div`
    display: flex;
    //flex-direction: column;
    width: 100%;
    max-height: 250px;
    justify-content: center;
    overflow-y: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    flex-wrap: wrap;
`

let ClassLabel = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`

let Input = styled.div`
    margin-top: 25px;

    &:first-of-type {
        margin-top: 0;
    }
`

let InputField = styled.input`
    width: calc(100% - 20px);
    text-decoration: none;
    background: none;
    margin: 0;
    padding: 8px;
    color: white;
    display: flex;
    border: 2px solid white;
    outline: none;

    transition: 0.2s ease-in-out;

    &:focus {
        border: 2px solid #2e80dd;
    }
`

let DateInputField = styled(InputField)`
    &:hover {
        cursor: pointer;
    }
`

let InputLabel = styled.div`
    position: relative;
    height: 20px;
    width: fit-content;
    padding: 0 5px;
    margin-bottom: -10px;
    margin-left: 10px;
    font-size: 14px;
    background-color: #303030;
`

let ClassInput = styled.div`
    display: flex;
    margin-top: 10px;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
`

let ClassInputField = styled.input`
    display: flex;
    border: 0;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    padding: 5px;
    border: 2px solid white;
    background: none;
    color: white;
    outline: 0;

    transition: 0.2s ease-in-out;

    &:focus {
        border: 2px solid #5EB638;
    }
`

let ClassAddButton = styled.div`
    //background-color: #5EB638;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 16.5px;
    border: 2px solid white;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        //background-color: #48872D;
        //background-color: white;
        border: 2px solid #5EB638;

        & > div {
            background-color: #5EB638;
        }
    }
`

let HorizontalSquare = styled.div`
    position: absolute;
    width: 15px;
    height: 4px;
    background-color: white;
    border-radius: 2px;

    transition: background-color 0.2s ease-in-out;
`

let VerticalSquare = styled(HorizontalSquare)`
    transform: rotate(90deg);
`

let ConfirmButton = styled.div`
    width: 180px;
    height: 35px;
    display: flex;
    background-color: #5EB638;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #448329;
    }
`

let KeyAmount = styled.div`
    display: flex;
    margin-top: 30px;
    height: 20px;
    align-items: center;
    justify-content: center;
`

let KeyAmountLabel = styled.div`

`

let KeyAmountInput = styled.input`
    border: 2px solid white;
    background: none;
    width: 20px;
    padding: 5px;
    margin: 0;
    margin-left: 10px;
    text-decoration: none;
    outline: none;
    color: white;
    text-align: center;
`

class Add extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
    }

    state = {
        nameInputFieldValue:"",
        dateStartInputFieldValue:"",
        dateEndInputFieldValue:"",
        classInputFieldValue:"",
        inputKeyAmountValue:"",
        classes: [
        ]
    }

    onChangeKeyAmount = (e) => {
        this.setState({inputKeyAmountValue:e.target.value});
    }

    onChangeNameInputField = (e) => {
        this.setState({nameInputFieldValue:e.target.value});
    }

    onChangeDateStartInputField = (e) => {
        this.setState({dateStartInputFieldValue:e.target.value});
    }

    onChangeDateEndInputField = (e) => {
        this.setState({dateEndInputFieldValue:e.target.value});
    }

    onChangeClassInputField = (e) => {
        this.setState({classInputFieldValue:e.target.value});
    }

    onClickClassAddButton = () => {
        let value = this.state.classInputFieldValue;

        if (value.length === 0) {
            return alert("Nazwa nie może być pusta.");
        }

        let classes = this.state.classes;

        let duplicate = classes.find(c => c === value);
        if (duplicate != null) {
            return alert("Pozycja z tą samą nazwą już istnieje!");
        }
            
        classes.push(this.state.classInputFieldValue);
        this.setState({classes,classInputFieldValue:""});
    }

    onClickClassButton = (cls) => {
        console.log(cls);
        let classes = this.state.classes;
        let targetClass = classes.find(c => c === cls);
        classes.splice(classes.indexOf(targetClass),1);
        this.setState({classes});
    }

    onClickConfirmButton = () => {
        if (this.state.nameInputFieldValue.length < 3) {
            return alert("Nazwa głosowania musi mieć przynajmniej 3 znaki.");
        }
        if (this.state.dateStartInputFieldValue.length === 0) {
            return alert("Data rozpoczęcia musi zostać określona.");
        }
        if (this.state.dateEndInputFieldValue.length === 0) {
            return alert("Data zakończenia musi zostać określona.");
        }
        if (this.state.classes.length < 2) {
            return alert("Głosowanie musi mieć przynajmniej 2 wybory.");
        }

        const config = {
            headers: {
                authToken: this.props.auth.getToken()
            }
        }

        let data = {
            title: this.state.nameInputFieldValue,
            dateFrom: this.state.dateStartInputFieldValue,
            dateTo: this.state.dateEndInputFieldValue,
            candidates: this.state.classes,
            keysPerVoter: this.state.inputKeyAmountValue
        }

        axios.post('https://localhost:5001/create_election', data, config)
            .then(res => {
                console.log(res.data);
                window.location.href = "/admin";
                
            })
            .catch(e => {
                if (e.response) {
                    console.log(e.response);
                    alert("Nie udało się utworzyć glosowania.");
                }
            })
    }

    renderClasses = () => {
        if (this.state.classes?.length === 0) {
            return "Brak"
        }
        
        return this.state.classes.map(
            c => (
                <Class
                    key={c}
                    class={c}
                    onClickClassButton={(cls) => this.onClickClassButton(cls)}
                />
            )
        );
    }

    render() { 
        return ( 
            <React.Fragment>
            <Title text="Dodawanie głosowania:"/>
            <Container>
                <InputBox>
                    <Input>
                        <InputLabel>Nazwa głosowania</InputLabel>
                        <InputField value={this.nameInputFieldValue} onChange={this.onChangeNameInputField} placeholder="Nazwa"/>
                    </Input>
                    <Input>
                        <InputLabel>Data rozpoczęcia</InputLabel>
                        <DateInputField value={this.dateStartInputFieldValue} onChange={this.onChangeDateStartInputField} className="no-select" type="date" placeholder="Data rozpoczęcia"/>
                    </Input>
                    <Input>
                        <InputLabel>Data zakończenia</InputLabel>
                        <DateInputField value={this.dateEndInputFieldValue} onChange={this.onChangeDateEndInputField} className="no-select" type="date" placeholder="Data zakończenia"/>
                    </Input>
                    <KeyAmount>
                        <KeyAmountLabel>Liczba kluczy na użytkownika: </KeyAmountLabel>
                        <KeyAmountInput value={this.state.inputKeyAmountValue} onChange={this.onChangeKeyAmount}></KeyAmountInput>
                    </KeyAmount>
                </InputBox>
                <ClassBox>
                    <ClassLabel>Kandydaci / Partie</ClassLabel>
                    <ClassInput>
                        <ClassInputField
                            placeholder="Nazwa"
                            value={this.state.classInputFieldValue}
                            onChange={this.onChangeClassInputField}
                        />
                        <ClassAddButton onClick={this.onClickClassAddButton}>
                            <HorizontalSquare />
                            <VerticalSquare />
                        </ClassAddButton>
                    </ClassInput>
                    <ClassList>
                        {this.renderClasses()}
                    </ClassList>
                </ClassBox>
            </Container>
            <ConfirmButton onClick={this.onClickConfirmButton}>Utwórz</ConfirmButton>
            <BackButton linkTo="/admin" />
        </React.Fragment>
        );
    }
}
 
export default Add;