import React, { Component } from 'react';
import styled from 'styled-components';

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

    transition: 0.2s ease-in-out;
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

class Add extends Component {
    state = {
        classInputFieldValue:"",
        classes: [
        ]
    }

    onChangeClassInputField = (e) => {
        this.setState({classInputFieldValue:e.target.value});
    }

    onClickClassAddButton = () => {
        let classes = this.state.classes;
        classes.push(this.state.classInputFieldValue);
        this.setState({classes,classInputFieldValue:""});
    }

    onClickClassButton = (cls) => {
        console.log(cls);
        let classes = this.state.classes;
        let targetClass = classes.find(c => c == cls);
        classes.splice(classes.indexOf(targetClass),1);
        this.setState({classes});
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
                        <InputField placeholder="Nazwa"/>
                    </Input>
                    <Input>
                        <InputLabel>Data rozpoczęcia</InputLabel>
                        <DateInputField className="no-select" type="date" placeholder="Data rozpoczęcia"/>
                    </Input>
                    <Input>
                        <InputLabel>Data zakończenia</InputLabel>
                        <DateInputField className="no-select" type="date" placeholder="Data zakończenia"/>
                    </Input>
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
            <ConfirmButton>Utwórz</ConfirmButton>
            <BackButton linkTo="/admin" />
        </React.Fragment>
        );
    }
}
 
export default Add;