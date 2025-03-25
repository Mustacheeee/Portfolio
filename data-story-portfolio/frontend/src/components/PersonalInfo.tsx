import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

import { services } from "../constants/index";
import { SectionWrapper } from "src/hoc/index.js";

import { fadeIn, textVariant, } from "../constants/motion.js";

const PersonalInfo = () => {

  // Add TypeScript interface for the service props
  interface ServiceProps {
    index: number;
    title: string;
    icon: string;
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-mywhite font-black mt-16 md:text-[60px] xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[40px] text-[30px] xs:ml-3">Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 flex text-secondary xl:flex-nowrap xs:flex-wrap text-[17px] leading-[30px] sm:mx-3 xs:mx-3'
      >
        <div className="personal-info bg-bigyellow mr-10 sm:w-1/2 xs:w-1/2">
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
      <div className="mt-10">
        <ScrollVelocity
        
          texts={[' React Bits ', 'Scroll Down',]} 
          velocity={40} 
          className="custom-scroll-text"
        />
        <ScrollVelocity
          texts={[' React Bits', 'Scroll Down',]} 
          velocity={40} 
          className="custom-scroll-text"
        />
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

// Scroll velocity component
import { useRef, useLayoutEffect, useState } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef as React.RefObject<HTMLElement>);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>
      );
    }

    return (
      <div
        className={`${parallaxClassName} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-3xl font-bold tracking-[-0.02em] drop-shadow md:text-[3rem] md:leading-[4rem]`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={`${className} ${
            index === 0 ? 'text-bigyellow' : 
            index === 1 ? 'text-tertiary' : 
            ''
          }`}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};



export default SectionWrapper(PersonalInfo, "personalInfo");