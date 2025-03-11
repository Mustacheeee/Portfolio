import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PersonalInfo = () => {
    return (_jsxs("div", { className: "personal-info", children: [_jsx("img", { src: "/profile.jpg" // Place your profile picture in `public/` folder
                , alt: "Your Name", className: "profile-pic" }), _jsx("h1", { children: "Your Name" }), _jsx("p", { className: "tagline", children: "Data Enthusiast | Full-Stack Developer | AI Explorer" }), _jsxs("div", { className: "contact-info", children: [_jsx("a", { href: "mailto:your.email@example.com", children: "your.email@example.com" }), _jsx("a", { href: "https://linkedin.com/in/your-profile", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }), _jsx("a", { href: "https://github.com/your-username", target: "_blank", rel: "noopener noreferrer", children: "GitHub" })] })] }));
};
export default PersonalInfo;
