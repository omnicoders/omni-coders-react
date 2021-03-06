import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Omni Coders</h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Welcome to Omni Coders!
                </p>
                <p className="card-text">
                  The purpose of Omni Coders is to provide tools, development and support that empowers local community organizations and non-profits. 
                </p>
                <p className="card-text">
                  Looking to contribute? Fork one of our repositories from <a href="https://github.com/omnicoders">https://github.com/omnicoders.</a> 
                </p>
              </div>
              {(Object.keys(this.props.currentUser).length > 0) ? (
                <ul className="list-group list-group-flush">               
                  <Link 
                    className="list-group-item list-group-item-action bg-info text-light"
                    to="/profile"
                  >Profile</Link>                  
                  <button
                    className="list-group-item list-group-item-action bg-secondary text-light"
                    onClick={ this.props.logoutCurrentUser }
                  >Logout</button>
                </ul>
              ) : (
                <ul className="list-group list-group-flush">
                  <Link 
                    className="list-group-item list-group-item-action bg-success text-light"
                    to="/projects"
                  >Projects</Link>
                  <Link 
                    className="list-group-item list-group-item-action bg-info text-light"
                    to="/login"
                  >Login</Link>
                  <Link 
                    className="list-group-item list-group-item-action bg-primary text-light"
                    to="/signup"
                  >Sign Up</Link>
                </ul>              
              )}  

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LandingPage;
