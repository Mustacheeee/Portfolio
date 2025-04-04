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
import Tech from './components/Tech';
import { StarsCanvas } from './components/canvas';
import Contact from './components/Contact';


function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className='bg-land-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Landing />
        </div>
        <PersonalInfo />
        <div className='relative z-0'>
          <Tech />
          <StarsCanvas />
        </div>
        <ProjectCard />
        {/* <AIChat /> */}
        <div className='bg-connect-pattern bg-cover bg-no-repeat bg-center'>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;