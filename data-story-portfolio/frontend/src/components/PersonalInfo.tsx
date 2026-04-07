import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";
import { fadeIn, textVariant } from "../constants/motion.js";
import linkedin from "../assets/linkedin-brands.svg";
import github from "../assets/github-brands.svg";
import download from "../assets/download-solid.svg";
import mypic from "../assets/mypic.png";

interface ButtonProps {
  label?: string;
  href: string;
  target?: string;
  svg?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Hover me',
  href,
  target = '_self',
  svg,
}) => {
  return (
    <motion.a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1, scale: 0.97 }}
      transition={{ type: "tween", duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="
        relative flex items-center justify-center gap-2
        px-4 py-3 min-h-[44px]
        text-bigyellow text-sm font-body
        border-none rounded-md
        outline outline-2 outline-tertiary
        cursor-pointer overflow-hidden
        transition-[color,box-shadow,outline-color] duration-300
        hover:text-highlight
        hover:outline-highlight/50
        hover:shadow-[0_4px_24px_-4px_rgba(251,236,4,0.2)]
        focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-primary
        group
      "
    >
      {svg && (
        <img src={svg} alt="" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className="
          absolute left-[-50px] top-0 w-0 h-full
          bg-tertiary -z-10
          transition-all duration-500
          group-hover:w-[250%]
          skew-x-[45deg]
        "
        aria-hidden="true"
      />
    </motion.a>
  );
};

const PersonalInfo = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="font-title text-mywhite mt-3 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none">
          Overview
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-6 flex text-secondary lg:flex-nowrap flex-wrap gap-8 sm:gap-10'
      >
        <div className="flex flex-col items-center text-center bg-bigyellow p-4 rounded-xl min-w-[12rem] max-w-[15rem] shrink-0 mx-auto lg:mx-0">
          <img
            src={mypic}
            alt="Yixin Zhao (Fiona)"
            className="w-48 sm:w-60 h-auto rounded-xl object-cover mb-3"
          />
          <div>
            <h3 className="text-primary font-title text-base">Yixin Zhao</h3>
            <p className="text-primary font-title text-sm">(Fiona)</p>
          </div>
        </div>

        <div className="flex flex-col font-body tracking-wide text-base leading-relaxed">
          <div className="xl:mr-20">
            <p>Recent Computer Science graduate from the University of Central Florida with a strong foundation in software development and AI. From building web apps with React to training machine learning models, I love turning ideas into impactful tech.</p>
            <p className="mt-4">I'm currently seeking a full-time software engineering role where I can grow and contribute to meaningful projects. Take a look around — I'd love to connect!</p>
          </div>
          <div className="flex flex-wrap py-5 gap-3">
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
      </motion.div>

      <div className="mt-10 overflow-hidden">
        <ScrollVelocity
          texts={[' Full-Stack Developer ', ' Front-End  Back-end ']}
          velocity={40}
          className="custom-scroll-text"
        />
        <ScrollVelocity
          texts={[' AI Explorer ', '  Data Enthusiast  ']}
          velocity={40}
          className="custom-scroll-text"
        />
      </div>
    </>
  );
};

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
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-body text-2xl sm:text-3xl md:text-[3rem] font-bold tracking-tight drop-shadow md:leading-[4rem]`}
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
