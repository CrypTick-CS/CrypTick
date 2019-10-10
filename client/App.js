import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Components/Dashboard';
import styled from 'styled-components';

const Main = styled.div`
    /* display: flex; */
    /* justify-content: center; */
    /* height: 100vh; */
    /* align-items: center; */
    background: #22252A;
    overflow: scroll;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      dollarBalance: 0,
      bitcoinBalance: 0,
      isError: false,
      email: null,
      timeRange: 30
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
      return res;
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      console.log(sessionStorage.getItem('_CrypTick'));
      this.setState({
        isAuthenticated: true,
        email: res.email
      });
      this.props.history.push('/');

      fetch('/transaction', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: res.email,
          transactionDetails: {
            transactionType: 'BUY',
            cryptoQty: 0,
            cryptoVal: 8500,
            cryptoType: 'BITCOIN'
          }
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log('this res',res);
        this.setState({
          dollarBalance: res.dollarBalance,
          bitcoinBalance: res.bitcoinBalance
        })
      })
      .catch(err => {
        console.error(err);
      })

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
    fetch('/transaction', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        transactionDetails: {
          transactionType: 'BUY',
          cryptoQty: portion,
          cryptoVal: currentBTCValue,
          cryptoType: 'BITCOIN'
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        dollarBalance: res.dollarBalance,
        bitcoinBalance: res.bitcoinBalance
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  sellBTC(portion, currentBTCValue) {
    fetch('/transaction', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        transactionDetails: {
          transactionType: 'SELL',
          cryptoQty: portion,
          cryptoVal: currentBTCValue,
          cryptoType: 'BITCOIN'
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('sell res',res)
      this.setState({
        dollarBalance: res.dollarBalance,
        bitcoinBalance: res.bitcoinBalance
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  changeTimeRange(newRange) {
    this.setState({timeRange: newRange});
  }

  setIsError() {
    this.setState({isError: false});
  }

  render() {
    return (
        <Main>
          <Route exact path="/login"
          component={() => <Login authenticate={this.authenticate.bind(this)}
            signup={this.signup.bind(this)}
            isError={this.state.isError}
            setIsError={this.setIsError.bind(this)} />} />
          <PrivateRoute exact path="/"
          authenticated={this.state.isAuthenticated}
          component={() => <Dashboard dollarBalance={this.state.dollarBalance}
            bitcoinBalance={this.state.bitcoinBalance}
            buyBTC={this.buyBTC.bind(this)}
            sellBTC={this.sellBTC.bind(this)}
            changeTimeRange={this.changeTimeRange.bind(this)}
            timeRange={this.state.timeRange}
            />} />
        </Main>
    );
  }

}



export default withRouter(App);
