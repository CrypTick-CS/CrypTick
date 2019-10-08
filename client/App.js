import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Components/Dashboard';


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
        <div>
          <Route exact path="/login" component={() => <Login authenticate={this.authenticate.bind(this)} />} />
          <PrivateRoute exact path="/" authenticated={this.state.isAuthenticated} component={Dashboard} />
        </div>
    );
  }

}



export default withRouter(App);