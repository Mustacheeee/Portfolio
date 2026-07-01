import { motion } from "framer-motion";

import { styles } from "../../styles.js";
import { ComputersCanvas } from "./canvas";
import { SectionWrapper } from "src/hoc/index.js";

const Landing = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      {/* Phones skip the 3D scene, so the headline carries the hero there */}
      <div
        className={`md:hidden absolute inset-0 max-w-7xl mx-auto ${styles.paddingX} flex flex-col justify-center z-10 pointer-events-none`}
      >
        <h1 className={styles.landingHeadText}>
          Hi, I'm <span className='text-highlight'>Fiona</span>
        </h1>
        <p className={`${styles.landingSubText} mt-2 max-w-[30ch]`}>
          I build web apps, mobile apps, and AI-powered products.
        </p>
      </div>

      <div className='hidden md:block absolute inset-0'>
        <ComputersCanvas />
      </div>

      <div className='absolute bottom-8 sm:bottom-10 w-full flex justify-center items-center z-10'>
        <a href='#personalInfo' aria-label="Scroll to about section">
          <div className='w-[32px] h-[58px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 22, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default SectionWrapper(Landing, "landing");
