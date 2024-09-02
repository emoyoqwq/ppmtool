import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT} from "./types";


export const createProject = (project, navigate) => async dispatch =>
{
    try{
        const res = await axios.post
        ("/api/project", project)
        navigate("/dashboard")

        dispatch({
            type:GET_ERRORS,
            payload: {}
        })
    } 
    catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response ? err.response.data : "An unexpected error occurred"
        })
        
    }
}

export const getProjects = () => async dispatch =>{
    const res = await axios.get("/api/project/all")
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id, navigate) => async dispatch =>{
    try {
        const res = await axios.get(`/api/project/${id}`)
        dispatch({
            type: GET_PROJECT,
            payload:res.data
        })
    } catch (error) {
        navigate("/dashboard")
    }
}

export const deleteProject = id => async dispatch =>{
    if(window.confirm("Are you sure? This will delete the project and all data related to it")){
        await axios.delete(`/api/project/${id}`)
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
    }
    
}
