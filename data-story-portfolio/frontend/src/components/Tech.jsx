import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <div className="my-10 sm:mt-20">
        <h2 className="font-title text-mywhite mt-3 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none text-right">
          SKILLS
        </h2>
      </div>
      <div className='mt-2 flex flex-row flex-wrap justify-center gap-6 sm:gap-10'>
        {technologies.map((technology) => (
          <div className='w-20 h-20 sm:w-28 sm:h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
