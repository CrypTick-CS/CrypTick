import React from 'react';
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis, LineMarkSeries
} from 'react-vis';

class CurrencyChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    setInterval(() => {
      fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD&api_key=c3928dbf8fd1c2f62b730f46a5fff3d1ba38535ecd0609cb68c95c31d92edd25').then(res => res.json())
      .then(res => {
        this.setState({
          data: this.state.data.concat({x: Date.now(), y: res['BTC']['USD']}).slice(-30)})
      })
      }, 4000);
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default CurrencyChart;