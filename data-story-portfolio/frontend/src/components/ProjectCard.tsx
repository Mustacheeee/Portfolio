import React from "react";
import { motion } from "framer-motion";

import github from "../assets/github-brands.svg";
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
  tags: Tag[];
  image: string;
  source_code_link?: string;
}

const ProjectCards = ({
  index,
  name,
  tags,
  image,
  source_code_link,
}: ProjectProps) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="group"
    >
      <div className="card border-2 border-white rounded-[1.5em] relative z-[1] overflow-hidden h-[500px] w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[580px] flex flex-col justify-center items-center bg-mywhite/10 hover:bg-mywhite/20 transition-all duration-300">

        {/* Overlay content (title, tags, etc.) */}
        <div className="absolute top-0 left-0 w-full bg-black z-[2]">
          <div className="container text-highlight relative flex flex-col gap-[0.5em] p-[1.5em]">
            <h1 className="card_heading text-[1.5em] tracking-[.2em]">{name.toUpperCase()}</h1>

            <div className="flex flex-wrap justify-left items-center gap-[0.5em]">
              {tags.map((tag) => (
                <div 
                  key={tag.name}
                  className={`border-2 border-mywhite rounded-[0.5em] ${tag.color} font-nunito text-[0.8em] font-normal px-[0.5em] py-[0.05em]`}
                >
                  <p>{tag.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div 
          className="absolute top-[120px] bg-black left-0 h-[calc(100%-120px)] w-full bg-cover bg-center transition-opacity duration-300 group-hover:opacity-40"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }} 
        >
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="hidden"
            loading="lazy"
          />
        </div>

        {source_code_link && (
          <div className="absolute top-[120px] left-0 h-[calc(100%-120px)] w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-[3]">
            <div 
              onClick={() => window.open(source_code_link, "_blank")}
              className="cursor-pointer hover:scale-110 transition-transform"
            >
              <img
                src={github}
                alt="source code"
                className="h-[3em] w-[3em] bg-mywhite/30 rounded-full p-1"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectCard = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-mywhite font-black md:text-[60px] mt-10 sm:mt-20 xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[40px] text-[30px] xs:ml-3">PROJECTS</h2>
      </motion.div>

      <div className='mt-10 sm:mt-20 w-full px-4 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCards key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(ProjectCard, "projectcard");