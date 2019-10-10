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
      bitcoinBalance: 0
    };
  }

  authenticate(userData) {
    // a way to set and check session storage...?
    if (sessionStorage.getItem('_CrypTick')){
      this.setState({
        isAuthenticated: true
      });
    }
    else {
      console.log(userData);
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        sessionStorage.setItem('_CrypTick', res.email)
        this.setState({
          isAuthenticated: true,
          dollarBalance: res.dollarBalance,
          bitcoinBalance: res.bitcoinBalance
        });
        this.props.history.push('/');
      })
      .catch(err => console.error(err))
    }
  }

  signup(userData) {
    console.log(userData);
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        isAuthenticated: true,
        dollarBalance: res.dollarBalance,
        bitcoinBalance: res.bitcoinBalance
      });
      this.props.history.push('/');
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
        <Main>
          <Route exact path="/login" component={() => <Login authenticate={this.authenticate.bind(this)} signup={this.signup.bind(this)} />} />
          <PrivateRoute exact path="/" authenticated={this.state.isAuthenticated} component={() => <Dashboard dollarBalance={this.state.dollarBalance} bitcoinBalance={this.state.bitcoinBalance} />} />
        </Main>
    );
  }

}



export default withRouter(App);