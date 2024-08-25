import ProjectItem from './Project/ProjectItem';
import React, { Component } from 'react'


class Dashboard extends Component {
  render() {
    return (
            <div>
            <h1 className='alert alert-warning'>Welcome to the Dashboard</h1>
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
            </div>
    );
  }
}

export default Dashboard;