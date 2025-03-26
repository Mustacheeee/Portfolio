import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";
import { fadeIn, textVariant, } from "../constants/motion.js";
import styled from 'styled-components';
import linkedin from "../assets/linkedin-brands.svg";
import github from "../assets/github-brands.svg";


interface ButtonProps {
  label?: string;
  href: string;
  target?: string;
  svg?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Hover me',
  href,
  target = '_self',
  svg,
  onClick
}) => {
  return (
    <div className="inline-block">
      <a 
        href={href}
        target={target}
        onClick={onClick}
        className="
          relative 
          flex items-center justify-center 
          gap-2 
          px-4 py-[0.8em] 
          text-[#F8DF51] 
          text-[15px] 
          border-none 
          rounded-[5px] 
          outline outline-2 outline-[#979c04] 
          cursor-pointer 
          overflow-hidden 
          transition-all duration-1000 
          hover:text-[#fbec04] 
          hover:scale-110 
          hover:shadow-[4px_5px_17px_-4px_#FBEC04]
          group
        "
      >
        {svg && (
          <img 
            src={svg} 
            alt="icon" 
            className="w-6 h-6"
          />
        )}
        <span className="relative z-10">{label}</span>
        
        {/* Pseudo-element background effect */}
        <span 
          className="
            absolute 
            left-[-50px] 
            top-0 
            w-0 
            h-full 
            bg-[#979c04] 
            -z-10 
            transition-all 
            duration-1000 
            group-hover:w-[250%] 
            skew-x-[45deg]
          "
        />
      </a>
    </div>
  );
};

// const StyledLink = styled.a`
//   padding: 0.8em 1em;
//   border: none;
//   border-radius: 5px;
//   letter-spacing: 2px;
//   cursor: pointer;
//   color: bigyellow;
//   transition: all 1000ms;
//   font-size: 15px;
//   position: relative;
//   overflow: hidden;
//   outline: 2px solid #F8DF51;
//   text-decoration: none;
//   display: inline-block;
//   text-align: center;

//   &:hover {
//     color: #fbec04;
//     transform: scale(1.1);
//     outline: 2px solid #F8DF51;
//     box-shadow: 4px 5px 17px -4px #FBEC04;
//   }

//   &::before {
//     content: "";
//     position: absolute;
//     left: -50px;
//     top: 0;
//     width: 0;
//     height: 100%;
//     background-color: #979c04;
//     transform: skewX(45deg);
//     z-index: -1;
//     transition: width 1000ms;
//   }

//   &:hover::before {
//     width: 250%;
//   }
// `;

const StyledWrapper = styled.div`
  display: inline-block;
`;

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
        <div className="flex-col font-body">
          [TODO]
          I'm a skilled software developer with experience in TypeScript and
          JavaScript, and expertise in frameworks like React, Node.js, and
          Three.js. I'm a quick learner and collaborate closely with clients to
          create efficient, scalable, and user-friendly solutions that solve
          real-world problems. Let's work together to bring your ideas to life!
          <div className="flex py-5 gap-4 font-body body-lowercase">
            <Button
            label="LinkedIn"
            href="https://www.linkedin.com/in/yixin-zhao-/"
            svg={linkedin}
            target="_blank"
            />
            <Button
            label="GitHub"
            href="https://github.com/Mustacheeee"
            svg={github}
            target="_blank"
            />
          </div>
        </div>
      </motion.p>

      <div className="mt-10">
        <ScrollVelocity
          texts={[' Full-Stack Developer ', ' Front-End  Back-end ',]} 
          velocity={40} 
          className="custom-scroll-text"
        />
        <ScrollVelocity
          texts={[' AI Explorer ', '  Data Enthusiast  ',]} 
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