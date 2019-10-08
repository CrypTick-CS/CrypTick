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
    background: midnightblue;
`;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  authenticate() {
    this.setState({isAuthenticated: true});
    this.props.history.push('/');
  }

  render() {
    return (
        <Main>
          <Route exact path="/login" component={() => <Login authenticate={this.authenticate.bind(this)} />} />
          <PrivateRoute exact path="/" authenticated={this.state.isAuthenticated} component={Dashboard} />
        </Main>
    );
  }

}



export default withRouter(App);