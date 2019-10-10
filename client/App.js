import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Components/Dashboard';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background: #22252A;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      dollarBalance: 0,
      bitcoinBalance: 0,
      isError: false,
    };
  }

  authenticate(userData) {
    console.log(userData);
    this.setState({isError: false})
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      if (res.status === 400) {
        this.setState({ isError: true })
        throw new Error('Invalid username or password');
      };
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.body);
      this.setState({
        isAuthenticated: true,
        dollarBalance: res.dollarBalance,
        bitcoinBalance: res.bitcoinBalance
      });
      this.props.history.push('/');
    })
    .catch(err => {
      console.error(err);
    })
  }

  signup(userData) {
    console.log(userData);
    this.setState({isError: false})
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.body);
      this.setState({
        isAuthenticated: true,
        dollarBalance: res.dollarBalance,
        bitcoinBalance: res.bitcoinBalance
      });
      this.props.history.push('/');
    })
    .catch(err => console.error(err))
  }

  buyBTC(portion, currentBTCValue) {
    console.log(portion);
    console.log(currentBTCValue);
  }

  sellBTC(portion, currentBTCValue) {
    console.log(portion);
    console.log(currentBTCValue);
  }

  render() {
    return (
        <Main>
          <Route exact path="/login" 
          component={() => <Login authenticate={this.authenticate.bind(this)} 
            signup={this.signup.bind(this)} 
            isError={this.state.isError} />} />
          <PrivateRoute exact path="/" 
          authenticated={this.state.isAuthenticated} 
          component={() => <Dashboard dollarBalance={this.state.dollarBalance} 
            bitcoinBalance={this.state.bitcoinBalance}
            buyBTC={this.buyBTC.bind(this)}
            sellBTC={this.sellBTC.bind(this)} />} />
        </Main>
    );
  }

}



export default withRouter(App);