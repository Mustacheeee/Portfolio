import React, { useEffect, useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Each BallCanvas creates its own WebGL context; mobile browsers cap
// contexts well below the ~15 this page needs, so phones get flat tiles
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

const Tech = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="my-10 sm:mt-20">
        <h2 className="font-title text-mywhite mt-3 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none text-right">
          SKILLS
        </h2>
      </div>
      <div className='mt-2 flex flex-row flex-wrap justify-center gap-4 sm:gap-10'>
        {technologies.map((technology) => (
          <div
            className='w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center'
            key={technology.name}
            title={technology.name}
          >
            {isMobile ? (
              <div className='w-full h-full rounded-2xl bg-bigyellow flex items-center justify-center shadow-md shadow-bigyellow/10'>
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className='w-11 h-11 object-contain'
                  loading='lazy'
                />
              </div>
            ) : (
              <BallCanvas icon={technology.icon} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
