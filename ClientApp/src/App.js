import React, { Component } from 'react';
import { Route } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './store/AuthenticationStore';

import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.refreshAuthentication = this.refreshAuthentication.bind(this);
  }

  refreshAuthentication() {
    this.props.refreshAuthenticationFunction();
  }

  componentWillMount() {
    this.refreshAuthentication();
  }

  render() {
    return this.props.isAuthenticated ?
      (<Layout>
        <Route exact path='/' component={Home} />
      </Layout>)
      :
      (<Layout>
        <Route component={Login} />
      </Layout>);
  }
}

export default connect(
  state => state.authenticationStore,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(App);