import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

let Container = styled(Link)`
    border: 1px solid white;
    flex: 1;
    margin: 15px;
    min-width: 170px;
    width: 170px;
    height: 200px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.8;

    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
        opacity: 1;
    }
`

let Title = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #202020;
    font-weight: 600;
    margin-bottom: 10px;
`

let Icon = styled.img`
    height: 50%;
`

class MenuSquare extends Component {
    state = {  }
    render() { 
        return (
            <Container to={this.props.linkTo}>
                <Title>{this.props.text}</Title>
                <Icon src={this.props.icon}/>
            </Container>
        );
    }
}
 
export default MenuSquare;