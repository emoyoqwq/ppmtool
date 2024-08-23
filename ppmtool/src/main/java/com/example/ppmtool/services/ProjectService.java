package com.example.ppmtool.services;

import com.example.ppmtool.Exceptions.ProjectIdException;
import com.example.ppmtool.domain.Project;
import com.example.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdate(Project project) {
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch(Exception e){
            throw new ProjectIdException("Project ID " + project.getProjectIdentifier().toUpperCase()+ " already exists");
        }
    }

    public Project findProjectByProjectIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project ID " + projectIdentifier.toUpperCase() + " does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project == null){
            throw new ProjectIdException("cannot delete project with ID ' " + projectIdentifier.toUpperCase() + " ' This project does not exist");
        }

        projectRepository.delete(project);
    }


}
