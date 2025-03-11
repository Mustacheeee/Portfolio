import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProjectCard = ({ project }) => {
    return (_jsxs("div", { className: "project-card", children: [project.imageUrl && (_jsx("img", { src: project.imageUrl, alt: project.title, className: "project-image" })), _jsx("h3", { children: project.title }), _jsx("p", { children: project.description }), _jsx("div", { className: "technologies", children: project.technologies.map((tech) => (_jsx("span", { className: "tech-tag", children: tech }, tech))) }), _jsxs("div", { className: "project-links", children: [project.demoUrl && (_jsx("a", { href: project.demoUrl, target: "_blank", rel: "noopener noreferrer", children: "Live Demo" })), project.codeUrl && (_jsx("a", { href: project.codeUrl, target: "_blank", rel: "noopener noreferrer", children: "View Code" }))] })] }));
};
export default ProjectCard;
