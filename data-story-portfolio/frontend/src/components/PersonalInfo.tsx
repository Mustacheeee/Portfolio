import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

import { services } from "../constants/index";
import { SectionWrapper } from "src/hoc/index.js";

import { fadeIn, textVariant } from "../constants/motion.js";

const PersonalInfo = () => {

  // Add TypeScript interface for the service props
  interface ServiceProps {
    index: number;
    title: string;
    icon: string;
  }


  const ServiceCard = ({ index, title, icon }: ServiceProps) => (
    <Tilt
      className='xs:w-[250px] w-full'
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />
  
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-white font-black md:text-[60px] xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[40px] text-[30px] xs:ml-3">Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 flex text-secondary xl:flex-nowrap xs:flex-wrap text-[17px] leading-[30px] sm:mx-3 xs:mx-3'
      >
        <div className="personal-info mr-10 sm:w-1/2 xs:w-1/2">
          <img 
            src="/mypic.jpg"
            alt="Your Name"
            className="profile-pic"
          />
          <h1>Yixin Zhao</h1>
          <h1>Fiona</h1>
        </div>
        [TODO]
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
    // <div className="personal-info">
    //   <img 
    //     src="/mypic.jpg"
    //     alt="Your Name"
    //     className="profile-pic"
    //   />
    //   <h1>Yixin Zhao</h1>
    //   <h1>Fiona</h1>
    //   <p className="tagline">Data Enthusiast | Full-Stack Developer | AI Explorer</p>
    //   <div className="contact-info">
    //     <a href="mailto:your.email@example.com">your.email@example.com</a>
    //     <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
    //       LinkedIn
    //     </a>
    //     <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
    //       GitHub
    //     </a>
    //   </div>
    // </div>
  );
};

export default SectionWrapper(PersonalInfo, "personalInfo");