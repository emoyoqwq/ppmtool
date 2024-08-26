import axios from "axios";
import { GET_ERRORS } from "./types";


export const createProject = (project, navigate) => async dispatch =>
{
    try{
        const res = await axios.post
        ("http://localhost:8080/api/project", project)
        navigate("/dashboard")
    } 
    catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response ? err.response.data : "An unexpected error occurred"
        })
        
    }
}