import React from 'react';

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
        {'hello world'}
      </div>
    );
  }

}

export default App;