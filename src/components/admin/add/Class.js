import React, { Component } from 'react';
import styled from 'styled-components';

let Container = styled.div`
    display: flex;
    width: calc(80% - 10px);
    color: #202020;
    height: 30px;
    align-items: center;
    margin-top: 10px;
`

let Label = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    padding-left:  10px;
    align-items: center;
    background-color: white;
`

let Button = styled.div`
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
        border: 2px solid #C92B2B;

        & > div {
            background-color: #C92B2B;
        }   
    }
`

let HorizontalSquare = styled.div`
    width: 15px;
    height: 4px;
    background-color: white;
    border-radius: 2px;

    transition: 0.2s ease-in-out;
`

class Class extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <Label>{this.props.class}</Label>
                <Button onClick={() => this.props.onClickClassButton(this.props.class)}>
                    <HorizontalSquare />
                </Button>
            </Container>
        );
    }
}
 
export default Class;