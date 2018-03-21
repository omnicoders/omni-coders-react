import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';

class Routes extends Component {
  render() {
    const landingPage = () => {
      return ( <LandingPage {...this.props} /> );
    };
    const loginPage = () => {
      return ( <LoginPage {...this.props} /> );
    };
    const signupPage = () => {
      return ( <SignupPage {...this.props} /> );
    };
    const profilePage = () => {
      return ( <ProfilePage {...this.props} /> );
    };
    const projectsPage = () => {
      return ( <ProjectsPage {...this.props} /> );
    };
    return (
      <main>
        <Switch>
          <Route exact path='/' render={landingPage} />
          <Route exact path='/login' render={loginPage} />
          <Route exact path='/signup' render={signupPage} />
          <Route exact path='/profile' render={profilePage} />
          <Route exact path='/projects' render={projectsPage} />
        </Switch>
      </main>
    );
  }
}

export default Routes;