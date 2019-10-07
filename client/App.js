import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'inital text'
    };
  }

  componentDidMount() {
    fetch('/').then(res => res.json()).then(res => {
      this.setState({text: res})
    });
  }

  render() {
    return (
      <div>{this.state.text}</div>
    );
  }

}

export default App;