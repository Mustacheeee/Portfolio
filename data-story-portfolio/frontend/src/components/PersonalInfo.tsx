import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants/index.js";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../../constants/motion.js";

const PersonalInfo = () => {
  // const ServiceCard = ({ index, title, icon }) => (
  //   <Tilt className='xs:w-[250px] w-full'>
  //     <motion.div
  //       variants={fadeIn("right", "spring", index * 0.5, 0.75)}
  //       className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
  //     >
  //       <div
  //         options={{
  //           max: 45,
  //           scale: 1,
  //           speed: 450,
  //         }}
  //         className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
  //       >
  //         <img
  //           src={icon}
  //           alt='web-development'
  //           className='w-16 h-16 object-contain'
  //         />
  
  //         <h3 className='text-white text-[20px] font-bold text-center'>
  //           {title}
  //         </h3>
  //       </div>
  //     </motion.div>
  //   </Tilt>
  // );
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {/* {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))} */}
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

export default PersonalInfo;