import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../../styles.js";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../constants/motion.js";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        // public key: TrzP5yhEjpAVF_PAw
        // Teplateid: template_qnqw7yo
        // Service ID: service_wgbas6r
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
          alert("Thank you. I will get back to you as soon as possible :)");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-0 mb-8 flex xl:flex-row justify-center flex-col-reverse gap-10`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black p-8 rounded-2xl -mt-6 border-2 border-mywhite/10 shadow-xl shadow-black/20 backdrop-blur-sm'
      >
        <div className="mb-8 ">
          <h3 className="text-bigyellow font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Let's connect!</h3>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-6 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-mywhite font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-mywhite py-4 px-6 placeholder:text-tertiary text-primary rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-mywhite/20 transition-all duration-300'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-mywhite font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-mywhite py-4 px-6 placeholder:text-tertiary text-primary rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-mywhite/20 transition-all duration-300'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-mywhite font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-mywhite py-4 px-6 placeholder:text-tertiary text-primary rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-mywhite/20 transition-all duration-300'
            />
          </label>

          <button
            type='submit'
            className='bg-bigyellow py-3 px-8 rounded-xl outline-none w-fit text-primary font-bold shadow-md shadow-primary hover:bg-tertiary hover:text-highlight transition-all duration-300'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
