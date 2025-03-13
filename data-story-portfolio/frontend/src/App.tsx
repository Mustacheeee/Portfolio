import React from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProjectCard from './components/ProjectCard';
import { Project } from '@shared/types';
import './App.css';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';


const projects: Project[] = [
  {
    id: '1',
    title: 'AI Career Advisor',
    description: 'An AI-powered tool to provide career advice based on skill gaps.',
    technologies: ['React', 'FastAPI', 'OpenAI'],
    demoUrl: 'https://your-demo-link.com',
    codeUrl: 'https://github.com/your-username/ai-career-advisor',
  },
  {
    id: '2',
    title: 'Data Visualization Dashboard',
    description: 'A dashboard to visualize complex datasets using interactive charts.',
    technologies: ['D3.js', 'TypeScript', 'Node.js'],
    demoUrl: 'https://your-demo-link.com',
    codeUrl: 'https://github.com/your-username/data-dashboard',
  },
];

function App() {
  return (
    <div className="App">
      <Navbar />
      <PersonalInfo />
      <AIChat />
      <section>
        {/* <h2>Project</h2> */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default App;