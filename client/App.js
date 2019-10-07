import React from 'react';
import PriceVis from './Components/PriceVis';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'inital text'
    };
  }

  render() {
    return (
      <div>
        <PriceVis />
      </div>
    );
  }

}

export default App;