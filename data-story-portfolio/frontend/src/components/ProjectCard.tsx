import React from 'react';
import { Project } from '@shared/types';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card">
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="project-image" />
      )}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="project-links">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
        {project.codeUrl && (
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
            View Code
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;