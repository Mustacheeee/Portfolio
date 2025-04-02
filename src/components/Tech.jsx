import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <div className="my-20">
        <h2 className="text-mywhite lg:text-[80px] text-right sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 sm:mx-3 xs:mx-3">SKILLS</h2>
      </div>
      <div className='mt-20 flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
