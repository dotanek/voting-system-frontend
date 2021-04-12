import React, { Component } from 'react';
import styled from 'styled-components';

let Container = styled.div`
    display: flex;
    height: 70%;
    padding-top: 30%;
    flex: 1;
    margin-left: 1%;
    margin-right: 1%;
    align-items: flex-end;
    min-width: 80px;
`

let Label = styled.div`
    height: 60px;
    margin-top: -60px;
    position: relative;
    display: flex;
    flex-direction:column;
`

let LabelName = styled.div`
    font-weight: 500;
    font-size: 10px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-end;
`

let LabelValue = styled.div`
    display: flex;
    font-size: 15px;
    flex: 1;
    align-items: center;
    align-items: flex-start;
    justify-content: center;
`

let Bar = styled.div`
    flex: 1;
    height: ${props => props.height+"%"};
    background-color: white;
`

class ChartBar extends Component {
    state = {  }
    render() { 

        let height = this.props.datum.value / this.props.total * 100;

        return (
            <Container height={this.props.height}>
                <Bar height={height}>
                    <Label>
                        <LabelName>{this.props.datum.label}</LabelName>
                        <LabelValue>{this.props.datum.value}</LabelValue>
                    </Label>
                </Bar>
            </Container>
        );
    }
}
 
export default ChartBar;