import React from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProjectCard from './components/ProjectCard';
import tsconfigPaths from 'vite-tsconfig-paths';
import Landing from './components/Landing.js';
// import { Project } from '@shared/types';
import './App.css';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import { BrowserRouter } from "react-router-dom";



// const projects: Project[] = [
//   {
//     id: '1',
//     title: 'AI Career Advisor',
//     description: 'An AI-powered tool to provide career advice based on skill gaps.',
//     technologies: ['React', 'FastAPI', 'OpenAI'],
//     demoUrl: 'https://your-demo-link.com',
//     codeUrl: 'https://github.com/your-username/ai-career-advisor',
//   },
//   {
//     id: '2',
//     title: 'Data Visualization Dashboard',
//     description: 'A dashboard to visualize complex datasets using interactive charts.',
//     technologies: ['D3.js', 'TypeScript', 'Node.js'],
//     demoUrl: 'https://your-demo-link.com',
//     codeUrl: 'https://github.com/your-username/data-dashboard',
//   },
// ];

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className='bg-land-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Landing />
        </div>
        <PersonalInfo />
        {/* <AIChat /> */}
        <section>
        {/* {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
          ))} */}
          </section>
      </div>
    </BrowserRouter>
  );
}

export default App;