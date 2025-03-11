import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PersonalInfo from './components/PersonalInfo';
import ProjectCard from './components/ProjectCard';
import SkillChart from './components/SkillChart';
import './App.css';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
const projects = [
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
    return (_jsxs("div", { className: "App", children: [_jsx(Navbar, {}), _jsx(PersonalInfo, {}), _jsx(AIChat, {}), _jsxs("section", { children: [_jsx("h2", { children: "Skills" }), _jsx(SkillChart, {})] }), _jsxs("section", { children: [_jsx("h2", { children: "Projects" }), projects.map((project) => (_jsx(ProjectCard, { project: project }, project.id)))] })] }));
}
export default App;
