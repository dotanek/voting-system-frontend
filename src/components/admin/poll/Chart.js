import React, { Component } from 'react';
import styled from 'styled-components';

import ChartBar from './ChartBar';

let Container = styled.div`
    margin-top: 20px;
    min-width: calc(500px);
    height: calc(300px - 2px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 20px;
`

class Chart extends Component {
    state = {  }

    renderChartBars = () => {
        let data = this.props.data.sort((a,b) => a.value < b.value);
        
        return data.map(
            d => (
                <ChartBar key={d.label} datum={d} total={data[0].value}/>
            )
        );
    }

    render() { 
        return (
            <Container>
                {this.renderChartBars()}
            </Container>
        );
    }
}
 
export default Chart;