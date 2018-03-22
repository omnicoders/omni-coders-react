import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import shortid from 'shortid';

class ProjectsPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      newProject: {
        name: "",
        description: "",
        repoUrl: "",
        demoUrl: ""
      }
    };
    this.getAllProjects = this.getAllProjects.bind(this);
    this.changeProject = this.changeProject.bind(this);
    this.submitNewProject = this.submitNewProject.bind(this);
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
  }

  getAllProjects() {
    axios.get(`https://omnicodersapi.codehesion.tech/projects`)
    .then(res => {
      //console.log(res.data);
      this.setState({
        projects: res.data.projects
      });        
    })
    .catch(error => {
        console.error(error);        
    });    
  }

  changeProject(e) {
    const field = e.target.name;
    const newProject = this.state.newProject;
    newProject[field] = e.target.value;
    this.setState({
      newProject
    });    
  }

  submitNewProject(project) {
    //console.log(project)
    if(project.name.length > 0 && project.description.length > 0 && project.repoUrl.length > 0){
      let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`,
          //'Content-Type': 'application/x-www-form-urlencoded'
        },
        'json': true
      };  
      axios.post('https://omnicodersapi.codehesion.tech/projects/new', project, config)
      .then(res => {
        console.log(res.data)        
        this.getAllProjects();
      })
      .catch(error => {
        console.error(error);
        this.setState({ newProject: project });
      });      
    }  
  }

  handleProjectSubmit(e) {
    e.preventDefault();
    let newProject = this.state.newProject;
    this.setState({
      newProject: {
        name: "",
        description: "",
        repoUrl: "",
        demoUrl: ""        
      }
    });
    this.submitNewProject(newProject);
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    const projects = this.state.projects.map((project, index) => {
      return (
        <Link 
          key={shortid.generate()}
          className="list-group-item list-group-item-action"
          to={`/projects/${project._id}`}
        >
          {project.name}
        </Link>
      )
    });    
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Projects</h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Here are some of the projects in development by Omni Coders:
                </p>
              </div>
              <ul className="list-group list-group-flush">
                { projects }
                <Link 
                  className="list-group-item list-group-item-action bg-primary text-light"
                  to="/"
                >Home</Link>
                <Link 
                  className="list-group-item list-group-item-action bg-info text-light"
                  to="/profile"
                >Profile</Link> 
                { this.props.isLoggedIn ? (
                  <button
                    className="list-group-item list-group-item-action bg-secondary text-light"
                    onClick={ this.props.logoutCurrentUser }
                  >Logout</button>
                ) : null }        
              </ul>
            </div>

            { (this.props.isLoggedIn && this.props.currentUser.isAdmin) ? (
              <div className="card mt-3">
                <div className="card-header bg-dark text-light">
                  <h4 className="card-title mb-0">New Project</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleProjectSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                        name="name"
                        className="form-control"
                        value={this.state.newProject.name}
                        onChange={this.changeProject}
                        placeholder="Project Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Description</label>
                      <input 
                        name="description"
                        className="form-control"
                        value={this.state.newProject.description}
                        onChange={this.changeProject}
                        placeholder="A short description of the Project."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="repoUrl">Repo URL</label>
                      <input 
                        name="repoUrl"
                        className="form-control"
                        value={this.state.newProject.repoUrl}
                        onChange={this.changeProject}
                        placeholder="https://github.com/omnicoders/my-repo-url"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="demoUrl">Demo URL</label>
                      <input 
                        name="demoUrl"
                        className="form-control"
                        value={this.state.newProject.demoUrl}
                        onChange={this.changeProject}
                        placeholder="https://url-to-my-project.org"
                      />
                    </div>
                    {( 
                      this.state.newProject.name.length > 0 &&
                      this.state.newProject.description.length > 0 &&
                      this.state.newProject.repoUrl.length > 0
                    ) ? (
                      <div className="form-group text-center">
                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                      </div>                    
                    ) : null }
                  </form>
                </div>
              </div>
            ) : null }  
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectsPage;
