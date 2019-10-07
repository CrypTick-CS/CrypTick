import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'inital text'
    };
  }

  click() {
    fetch('/api').then(res => res.json()).then(res => {
      this.setState({text: res.text})})
  }

  render() {
    return (
      <div>
        <div>alrighty</div>
        <div>{this.state.text}</div>
        <button onClick={this.click.bind(this)}>click me</button>
      </div>
    );
  }

}

export default App;