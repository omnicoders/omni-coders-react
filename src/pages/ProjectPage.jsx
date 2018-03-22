import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class ProjectPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      project: {}
    };
    this.getProject = this.getProject.bind(this);
  }

  getProject() {
    axios.get(`https://omnicodersapi.codehesion.tech/projects/${this.props.projectId}`)
    .then(res => {
      //console.log(res.data);
      let createdDate = new Date(res.data.project.createdAt);
      res.data.project['createdFromNow'] = moment(createdDate).fromNow();      
      this.setState({
        project: res.data.project
      });        
    })
    .catch(error => {
        console.error(error);        
    });       
  }

  componentDidMount() {
    this.getProject();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                {(Object.keys(this.state.project).length > 0) ? (
                  <h4 className="card-title mb-0">{this.state.project.name}</h4>
                ) : (
                  <h4 className="card-title mb-0">Loading Project...</h4>
                )}  
              </div>
              {(Object.keys(this.state.project).length > 0) ? (
                <div>
                  <div className="card-body">
                    
                    <p className="card-text">
                      posted { this.state.project.createdFromNow } by { this.state.project.user.username }
                    </p>

                    <p className="card-text">
                      { this.state.project.description }
                    </p>

                    <p className="card-text">
                      Repo:&nbsp;
                        <a 
                          target="_blank"
                          href={this.state.project.repoUrl}
                        >{ this.state.project.repoUrl }</a>
                    </p>

                    { (this.state.project.demoUrl.length > 0) ? (
                      <p className="card-text">
                        Demo:&nbsp;
                        <a 
                          target="_blank"
                          href={this.state.project.demoUrl}
                        >{ this.state.project.demoUrl }</a>
                      </p>                      
                    ) : null}

                  </div>
                  <ul className="list-group list-group-flush">
                    <Link 
                      className="list-group-item list-group-item-action bg-primary text-light"
                      to="/"
                    >Home</Link>
                    <Link 
                      className="list-group-item list-group-item-action bg-info text-light"
                      to="/profile"
                    >Profile</Link> 
                    <Link 
                      className="list-group-item list-group-item-action bg-success text-light"
                      to="/projects"
                    >Projects</Link>                    
                    { (this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
                      <Link 
                        className="list-group-item list-group-item-action bg-warning text-light"
                        to={`/projects/${this.state.project._id}/edit`}
                      >Edit Project</Link>
                    ) : null }
                    { this.props.isLoggedIn ? (
                      <button
                        className="list-group-item list-group-item-action bg-secondary text-light"
                        onClick={ this.props.logoutCurrentUser }
                      >Logout</button>
                    ) : null }
                  </ul>
                </div>
              ) : null }  
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ProjectPage;
