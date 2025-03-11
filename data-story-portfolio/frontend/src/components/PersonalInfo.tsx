import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="personal-info">
      <img 
        src="/profile.jpg"  // Place your profile picture in `public/` folder
        alt="Your Name"
        className="profile-pic"
      />
      <h1>Your Name</h1>
      <p className="tagline">Data Enthusiast | Full-Stack Developer | AI Explorer</p>
      <div className="contact-info">
        <a href="mailto:your.email@example.com">your.email@example.com</a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default PersonalInfo;