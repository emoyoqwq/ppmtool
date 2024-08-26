import React, { Component } from 'react'
import { createProject, getProject } from '../../actions/projectActions'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classnames from "classnames"
import { useParams, useNavigate} from 'react-router-dom'



class UpdateProject extends Component {
    constructor(){
        super()

        this.state = {
            "id": "",
            "projectName": "",
            "projectIdentifier": "",
            "description": "",
            "start_date": "",
            "end_date": "",
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        const {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        } = nextProps.project

        this.setState({
            id :id || "",
            projectName:projectName || "",
            projectIdentifier:projectIdentifier || "",
            description:description || "",
            start_date:start_date || "",
            end_date:end_date || ""
        })
    }

    componentDidMount(){
        const {id} = this.props.params
        this.props.getProject(id, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const updateProject ={
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        this.props.createProject(updateProject, this.props.navigate)
    }

    render() {
    return (
        <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">UpdateProject form</h5>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " placeholder="Project Name" name="projectName" value={this.state.projectName} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID" name="projectIdentifier" value={this.state.projectIdentifier} onChange={this.onChange}
                                disabled />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Project Description" name="description" value={this.state.description} onChange={this.onChange}></textarea>
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="start_date" value={this.state.start_date} onChange={this.onChange}/>
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="end_date" value={this.state.end_date} onChange={this.onChange}/>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
    }
}

export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
      const params = useParams();
      const navigate = useNavigate();
      return <Component {...props} params={params} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
};

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    project: state.project.project
})


export default connect(mapStateToProps,{getProject,createProject})(withRouter(UpdateProject));