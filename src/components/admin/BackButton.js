import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

let Container = styled(Link)`
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2e80dd;
    color: white;
    font-weight: 600;
    margin-top: 20px;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #1F5694;
    }
`

class BackButton extends Component {
    state = {  }

    render() { 
        return (
            <Container to={this.props.linkTo}>{this.props.text || "Powrót"}</Container>
        );
    }
}
 
export default BackButton;