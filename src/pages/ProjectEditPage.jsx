import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';

class ProjectEditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      project: {
        name: "",
        description: "",
        repoUrl: "",
        demoUrl: ""
      }
    };
    this.getProject = this.getProject.bind(this);
    this.changeProject = this.changeProject.bind(this);
    this.submitProjectUpdate = this.submitProjectUpdate.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
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

  changeProject(e) {
    const field = e.target.name;
    const project = this.state.project;
    project[field] = e.target.value;
    this.setState({
      project
    });    
  }

  submitProjectUpdate(project) {
    //console.log(project)
    if(project.name.length > 0 && project.description.length > 0 && project.repoUrl.length > 0){
      let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`,
          //'Content-Type': 'application/x-www-form-urlencoded'
        },
        'json': true
      };  
      axios.post(`https://omnicodersapi.codehesion.tech/projects/${this.props.projectId}/edit`, project, config)
      .then(res => {
        //console.log(res.data)        
        this.getProject();
      })
      .catch(error => {
        console.error(error);
        this.setState({ project });
      });      
    }  
  }

  handleProjectUpdate(e) {
    e.preventDefault();
    let project = this.state.project;
    this.setState({
      project: {
        name: "",
        description: "",
        repoUrl: "",
        demoUrl: ""        
      }
    });
    this.submitProjectUpdate(project);
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
                  <h4 className="card-title mb-0">Edit {this.state.project.name}</h4>
                ) : (
                  <h4 className="card-title mb-0">Loading Project...</h4>
                )}  
              </div>
              {(Object.keys(this.state.project).length > 0) ? (
                <div>
                  <div className="card-body">
                    <form onSubmit={this.handleProjectUpdate}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                          name="name"
                          className="form-control"
                          value={this.state.project.name}
                          onChange={this.changeProject}
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                          name="description"
                          className="form-control"
                          value={this.state.project.description}
                          onChange={this.changeProject}
                          placeholder="A short description of the Project."
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="repoUrl">Repo URL</label>
                        <input 
                          name="repoUrl"
                          className="form-control"
                          value={this.state.project.repoUrl}
                          onChange={this.changeProject}
                          placeholder="https://github.com/omnicoders/my-repo-url"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="demoUrl">Demo URL</label>
                        <input 
                          name="demoUrl"
                          className="form-control"
                          value={this.state.project.demoUrl}
                          onChange={this.changeProject}
                          placeholder="https://url-to-my-project.org"
                        />
                      </div>
                      {( 
                        this.state.project.name.length > 0 &&
                        this.state.project.description.length > 0 &&
                        this.state.project.repoUrl.length > 0
                      ) ? (
                        <div className="form-group text-center">
                          <button type="submit" className="btn btn-success mt-3">Save Changes</button>
                        </div>                    
                      ) : null }                      
                    </form>    

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

export default ProjectEditPage;
