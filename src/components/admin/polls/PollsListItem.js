import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

let Container = styled(Link)`
    height: 50px;
    width: calc(100% - 4px);
    display: flex;
    color: white;
    margin-top: 15px;
    transition: 0.2s ease-in-out;
    border-left: 4px solid white;
    background-color: ${props => props.isactive ? "rgba(87,161,61,0.3)" : "rgba(114,176,208,0.3)"};

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        background-color: ${props => props.isactive ? "rgba(87,161,61,1)" : "rgba(114,176,208,1)"};
    }
`
let Name = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1.5;
`

let DateStart = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

let DateEnd = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

let Votes = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.9;
`

let Status = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    font-size: 14px;
`

let Top = styled.div`
    display: flex;
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    align-items: flex-end;
    padding-left: 10px;
`

let Bottom = styled.div`
    display: flex;
    flex: 1;
    font-size: 15px;
    padding-left: 10px;
`

class PollsListItem extends Component {
    state = {  }
    render() { 
        return (
            <Container to={"/admin/polls-view/"+this.props.poll.electionId} isactive={this.props.poll.active ? 1 : 0}>
                <Name>
                    <Top>Nazwa</Top>
                    <Bottom>{this.props.poll.title}</Bottom>
                </Name>
                <DateStart>
                    <Top>Początek</Top>
                    <Bottom>{this.props.poll.dateFrom.slice(0,10)}</Bottom>
                </DateStart>
                <DateEnd>
                    <Top>Koniec</Top>
                    <Bottom>{this.props.poll.dateTo.slice(0,10)}</Bottom>
                </DateEnd>
                <Votes>
                    <Top>Łączne głosy</Top>
                    <Bottom>123456</Bottom>
                </Votes>
                <Status>
                    {this.props.poll.active ? "Aktywna" : "Zakończona"}
                </Status>
            </Container>
        );
        
    }
}
 
export default PollsListItem;