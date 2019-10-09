import React from 'react';
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis, LineSeries
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
      intervalID: null,
      yDomain: null,
    }
  }

  componentDidMount() {
    fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=30&toTs=${Date.now()}&api_key=${config.key}`)
    .then(res => res.json())
    .then(res => {
      console.log(res['Data']['Data'])
      let high = 0;
      let low = 100000;
      const data = res['Data']['Data'].slice(-30).map(element => {
        if (element.close > high) high = element.close
        if (element.close < low) low = element.close
        return {x: Number(element.time.toString() + '000'), y: element.close}
      })
      console.log(data);
      this.setState({
      data,
        yDomain: [low - 20, high + 20]
    })
    });
    const intervalID = setInterval(() => {
      fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD&api_key=${config.key}`).then(res => res.json())
      .then(res => {
        const low = this.state.data.reduce((acc, cur) => acc > cur.y ? y : acc)
        console.log(low);
        const high = this.state.data.reduce((acc, cur) => acc < cur.y ? y : acc)
        console.log(high);
        this.setState({
          data: this.state.data.concat({x: Date.now(), y: res['BTC']['USD']})
        })
      }, console.log(this.state.data))
      }, 1000);

    this.setState({intervalID});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    return (
      <CurrencyChartDiv>
        <XYPlot height={600} width={600} yDomain={this.state.yDomain}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries 
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