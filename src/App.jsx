import React, { Component } from 'react';
import Routes from './Routes';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      currentUser: {}
    }
  }

  render() {
    return (
      <div className="viewport-container">
        <Routes {...this.state} />    
      </div>
    );
  }
}

export default App;