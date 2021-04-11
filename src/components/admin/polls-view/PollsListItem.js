import React, { Component } from 'react';
import styled from 'styled-components';

let Container = styled.div`
    height: 40px;
    display: flex;
    color: white;
    margin-top: 15px;

    transition: 0.2s ease-in-out;
`

let HeaderContainer = styled(Container)`
    font-weight: 500;
    width: 100%;
`

let ItemContainer = styled(Container)`
    font-weight: 400;
    width: calc(100% - 4px);
    background-color: rgba(255,255,255,0.1);
    border-left: 4px solid white;

    color: ${props => props.isActive ?  '#ffffff' : '#aaaaaa'};

    &:hover {
        background-color: white;
        cursor: pointer;
        color: #202020;
    }
`

let Name = styled.div`
    height: 100%;
    width: calc(35% - 10px);
    display: flex;
    align-items: center;
    padding-left: 10px;
`
let Date = styled.div`
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
`

let Votes = styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    margin-left: 10px;
`

let Active = styled.div`
    height: 100%;
    width: calc(30% - 10px);
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding-right: 10px;
    justify-content: flex-end;
`

class PollsListItem extends Component {
    state = {  }
    render() { 

        if (this.props.isHeader) {
            return (
                <HeaderContainer>
                     <Name>Nazwa</Name>
                     <Votes>Głosy</Votes>
                     <Date>Data</Date>
                     <Active>Status</Active>
                </HeaderContainer>
            );
        }

        return (
            <ItemContainer isActive={this.props.poll.active}>
                <Name>{this.props.poll.name}</Name>
                <Votes>105432</Votes>
                <Date>{this.props.poll.date}</Date>
                <Active>{this.props.poll.active ? "Aktywne" : "Zakończone"}</Active>
            </ItemContainer>
        );
    }
}
 
export default PollsListItem;