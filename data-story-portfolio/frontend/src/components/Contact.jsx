import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { SectionWrapper } from "../hoc";
import { slideIn } from "../constants/motion.js";

const statusVariants = {
  initial: { opacity: 0, y: 10, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -10, height: 0, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } },
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        'service_wgbas6r',
        'template_qnqw7yo',
        {
          from_name: form.name,
          to_name: "Fiona",
          from_email: form.email,
          to_email: "yixin.fiona.zhao@gmail.com",
          message: form.message,
        },
        'TrzP5yhEjpAVF_PAw'
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(null), 6000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error(error);
          setTimeout(() => setStatus(null), 6000);
        }
      );
  };

  const inputClasses = "bg-mywhite py-4 px-5 text-base placeholder:text-tertiary/70 placeholder:font-body text-primary font-body rounded-lg outline-none border-2 border-transparent font-medium focus-visible:border-highlight/50 transition-all duration-200 min-h-[48px]";

  return (
    <div className='xl:mt-0 mb-8 flex xl:flex-row justify-center flex-col-reverse gap-10'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-tertiary p-6 sm:p-8 rounded-2xl -mt-6 border border-mywhite/10 shadow-xl shadow-primary/30'
      >
        <div className="mb-8">
          <h3 className="text-bigyellow font-black md:text-[60px] sm:text-[50px] text-[30px]">
            Let's connect!
          </h3>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-6 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-mywhite font-body font-medium mb-3'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={inputClasses}
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-mywhite font-body font-medium mb-3'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={inputClasses}
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-mywhite font-body font-medium mb-3'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              className={`${inputClasses} min-h-0`}
              required
            />
          </label>

          <div className="flex flex-col gap-4">
            <motion.button
              type='submit'
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
              className='bg-mywhite py-3 px-8 w-full sm:w-fit text-tertiary font-bold shadow-md shadow-bigyellow/30 hover:bg-primary hover:text-secondary transition-all duration-300 rounded-xl min-h-[48px] focus-visible:ring-2 focus-visible:ring-highlight disabled:opacity-60'
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : "Send"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-bigyellow/20 border border-bigyellow/30">
                    <svg className="w-5 h-5 text-bigyellow shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-bigyellow font-body text-sm">
                      Message sent! I'll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-400 font-body text-sm">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
