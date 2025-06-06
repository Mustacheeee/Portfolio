import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";
import { fadeIn, textVariant, } from "../constants/motion.js";
import styled from 'styled-components';
import linkedin from "../assets/linkedin-brands.svg";
import github from "../assets/github-brands.svg";
import download from "../assets/download-solid.svg";

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
          px-4 py-[0.4em] 
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
        className='mt-4 flex text-secondary xl:flex-nowrap lg:flex-nowrap xs:flex-wrap text-[17px] leading-[30px] sm:mx-3 xs:mx-1'
      >
        <div className="personal-info bg-bigyellow mr-10 sm:w-1/3 xs:w-cd xl:ml-20 ">
          <img 
            src="/Portfolio/mypic.png"
            alt="Your Name"
            className="profile-pic"
          />
          <div>
            <h1 className="text-primary">Yixin Zhao</h1>
            <h1 className="text-primary">(Fiona)</h1>
          </div>
        </div>
        <div className="flex-col lg:mx-10 xl:ml-0 font-body tracking-wide xs:text-[15px] sm:text-[15px] text-[16px]">
          <div className=" xl:ml-0 xl:mr-20">
            <p>Recent Computer Science graduate from the University of Central Florida with a strong foundation in software development and AI. From building web apps with React to training maching learning models, I love turning ideas into impactful tech.</p>
            {/* <p>I'm experienced in Java, Python, C++, and JavaScript, with hands-on work in full-stack development, machine learning, and robotics. From building web apps with React to training models with TensorFlow, I love turning ideas into impactful tech.</p> */}
            <p>I'm currently seeking a full-time software engineering role where I can grow and contribute to meaningful projects. Take a look around — I’d love to connect!</p>
          </div>
          <div className="flex py-4 gap-3 font-body body-lowercase">
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
            <Button
            label="Resume"
            href="/Portfolio/resume.pdf"
            svg={download}
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