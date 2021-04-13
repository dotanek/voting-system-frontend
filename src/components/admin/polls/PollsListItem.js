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
    //background-color: rgba(255,255,255,0.2);
    //background-color: rgba(87,161,61,0.3);
    //background-color: #57A13D;
    //box-shadow: 0px 0px 5px rgba(0,0,0,0.3);

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        //background-color: rgba(255,255,255,1);
        background-color: ${props => props.isactive ? "rgba(87,161,61,1)" : "rgba(114,176,208,1)"};
        //color: #202020;
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

let LastTop = styled(Top)`
    justify-content: flex-end;
    padding-left: 0;
    padding-right: 10px;
`

let LastBottom = styled(Bottom)`
    justify-content: flex-end;
    padding-left: 0;
    padding-right: 10px;
`

class PollsListItem extends Component {
    state = {  }
    render() { 
        return (
            <Container to={"/admin/polls-view/"+this.props.poll.id} isactive={this.props.poll.active}>
                <Name>
                    <Top>Nazwa</Top>
                    <Bottom>{this.props.poll.name}</Bottom>
                </Name>
                <DateStart>
                    <Top>Początek</Top>
                    <Bottom>{this.props.poll.date_start}</Bottom>
                </DateStart>
                <DateEnd>
                    <Top>Koniec</Top>
                    <Bottom>{this.props.poll.date_end}</Bottom>
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