import React, { Component } from 'react';
import styled from 'styled-components';

let Container = styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid white;
    font-size: 20px;

    @media (max-width:650px) {
        width: 80vw;
    }
`

class Title extends Component {
    state = {  }
    render() { 
        return (
            <Container>{this.props.text}</Container>
        );
    }
}
 
export default Title;