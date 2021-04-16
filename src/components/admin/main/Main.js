import React, { Component } from 'react';
import styled from 'styled-components';

import MenuSquare from './MenuSquare';
import Title from '../Title';

import icon_poll_magnify from '../../../resources/icon_poll_magnify_white.svg';
import icon_poll_add from '../../../resources/icon_poll_add_white.svg';

let Container = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

let LogoutLabel = styled.div`
    margin-top: 10px;
    text-decoration: underline;
    color: white;

    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        color: #2B7FDF;
    }
`

class Main extends Component {
    state = {  }

    onClickLogoutLabel = () => {
        // Logout code.
       window.location.href = "/entry/admin";
    }

    render() { 
        return (
            <React.Fragment>
                <Title text="Wybierz co chcesz zrobić:"/>
                <Container>
                    <MenuSquare
                        linkTo="/admin/polls-view"
                        text="Przeglądaj głosowania"
                        icon={icon_poll_magnify}
                    />
                    <MenuSquare
                        linkTo="/admin/polls-add"
                        text="Stwórz głosowanie"
                        icon={icon_poll_add}
                    />
                </Container>
                <LogoutLabel onClick={this.onClickLogoutLabel}>Powrót do autoryzacji.</LogoutLabel>
            </React.Fragment>
        );
    }
}
 
export default Main;