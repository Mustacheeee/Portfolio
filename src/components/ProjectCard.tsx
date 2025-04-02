import React from "react";
import { motion } from "framer-motion";

import github from "../assets/github.png";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../constants/motion.js";

interface Tag {
  name: string;
  color: string;
}

interface ProjectProps {
  index: number;
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  source_code_link: string;
}

const ProjectCards = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}: ProjectProps) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="group"
    >
      <div className="card shadow-[0px_4px_16px_px_#367E08] border-2 border-white rounded-[0.5em] h-[400px] w-[280px] rounded-[1.5em] relative flex justify-end flex-col z-[1] overflow-hidden">
        
        <div 
          onClick={() => window.open(source_code_link, "_blank")}
          className="absolute top-4 right-4 z-[3] cursor-pointer hover:scale-110 transition-transform"
        >
          <img
            src={github}
            alt='source code'
            className='h-[2em] w-[2em] bg-mywhite/30 rounded-full p-1'
          />
        </div>

        <div className="absolute top-0 left-0 w-full bg-black z-[2]">
          <div className="container text-highlight relative font-nunito flex flex-col gap-[0.5em] p-[1.5em]">
            <div className="h-fit w-full">
              <h1 
                className="card_heading text-[1.5em] tracking-[.2em]" 
                style={{
                  fontWeight: 900, 
                  WebkitTextFillColor: 'transparent', 
                  WebkitTextStrokeWidth: 1, 
                  textShadow: '0 0 7px #f8df51'
                }}
              >
                {name.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-wrap justify-left items-center h-fit w-full gap-[0.5em]">
              {tags.map((tag) => (
                <div 
                  key={tag.name}
                  className={`bg-black border-2 border-white rounded-[0.5em] ${tag.color} font-nunito text-[0.8em] font-normal px-[0.5em] py-[0.05em]`}
                >
                  <p>{tag.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          className="absolute top-[120px] left-0 h-[calc(100%-120px)] w-full" 
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
        <p className="font-body block text-mywhite text-[20px] font-light relative 
          h-[0em] 
          group-hover:h-[13em] 
          md:group-hover:h-[13em] 
          md:h-[0em] 
          sm:h-[13em] 
          xs:h-[13em] 
          duration-500 
          overflow-hidden 
          z-[2] 
          bg-black/90 
          p-2 
          rounded-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectCard = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-white font-black md:text-[60px] mt-20 xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[40px] text-[30px] xs:ml-3">PROJECTS</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] sm:mx-3 xs:mx-3'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCards key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(ProjectCard, "projectcard");