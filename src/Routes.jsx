import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

class Routes extends Component {
  render() {
    const landingPage = () => {
      return ( <LandingPage {...this.props} /> );
    };
    return (
      <main>
        <Switch>
          <Route exact path='/' render={landingPage} />
        </Switch>
      </main>
    );
  }
}

export default Routes;