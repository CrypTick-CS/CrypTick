import React from 'react';
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis, LineMarkSeries
} from 'react-vis';
import config from '../../config';
import styled from 'styled-components';

const CurrencyChartDiv = styled.div`
    margin-top: 10px;
    background: #393E44;
    padding: 25px;
    border-radius: 10px;
`;

class CurrencyChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      intervalID: null
    }
  }

  componentDidMount() {
    const intervalID = setInterval(() => {
      fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD&api_key=${config.key}`).then(res => res.json())
      .then(res => {
        this.setState({
          data: this.state.data.concat({x: Date.now(), y: res['BTC']['USD']}).slice(-30)})
      })
      }, 4000);

    this.setState({intervalID});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    return (
      <CurrencyChartDiv>
        <XYPlot height={600} width={600}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineMarkSeries 
            style={{
              strokeLinejoin: 'round',
              strokeWidth: 4
            }} 
            animation 
            data={this.state.data} 
          />
        </XYPlot>
      </CurrencyChartDiv>
    )
  }
}

export default CurrencyChart;