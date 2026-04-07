import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { styles } from "../../styles.js";

const navLinks = [
  { id: "personalInfo", title: "ABOUT" },
  { id: "projectcard", title: "PROJECT" },
  { id: "aiChat", title: "CHATBOT" },
  { id: "contact", title: "CONTACT" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] },
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.25, ease: [0.25, 1, 0.5, 1] },
  }),
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!toggle) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-secondary origin-left z-50"
        style={{ scaleX }}
      />
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-500 ${
          scrolled ? "bg-primary/95 backdrop-blur-sm shadow-lg shadow-primary/20" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
          <Link
            to='/'
            className='flex items-center gap-2 group'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <p className='text-mywhite text-lg font-bold cursor-pointer font-title transition-colors duration-200 group-hover:text-secondary'>
              Yixin|Fiona
            </p>
          </Link>

          <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className='relative'
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  className={`${
                    active === nav.title ? "text-highlight" : "text-secondary"
                  } hover:text-highlight text-lg font-body font-medium cursor-pointer transition-colors duration-200 block py-1`}
                >
                  {nav.title}
                </a>
                {active === nav.title && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-highlight"
                    transition={{ type: "tween", duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className='sm:hidden flex flex-1 justify-end items-center' ref={menuRef}>
            <button
              type="button"
              className='w-11 h-11 flex items-center justify-center rounded-lg active:scale-95 transition-transform duration-100'
              onClick={() => setToggle(!toggle)}
              aria-expanded={toggle}
              aria-label={toggle ? "Close menu" : "Open menu"}
            >
              <img
                src={toggle ? close : menu}
                alt=""
                className='w-7 h-7 object-contain'
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {toggle && (
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl border border-mywhite/10"
                  role="menu"
                >
                  <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                    {navLinks.map((nav, i) => (
                      <motion.li
                        key={nav.id}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        className={`font-body font-medium cursor-pointer text-base ${
                          active === nav.title ? "text-highlight" : "text-secondary"
                        }`}
                        role="menuitem"
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                      >
                        <a href={`#${nav.id}`} className="block py-1">{nav.title}</a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
