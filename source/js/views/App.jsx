import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Routes from 'constants/routes';

class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default hot(module)(App);
