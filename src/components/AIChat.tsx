import React, { useState } from 'react';
import { fadeIn, textVariant } from "../constants/motion.js";
import { motion } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: question }),
      });
      
      const data = await response.json();
      console.log('Setting answer:', data.answer);
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer("Error fetching answer");
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-mywhite mt-16 text-center md:text-[60px] xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[40px] text-[30px] xs:ml-3">Ask Me Anything About  
          <h2 className='text-highlight'>Fiona</h2></h2>
      </motion.div>
  
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-20 mb-48 min-h-80 text-secondary text-[17px] leading-[30px] sm:mx-3 xs:mx-3'
      >
        <div className="bg-tertiary p-8 rounded-2xl shadow-bigyellow shadow-md w-full max-w-4xl mx-auto">
          <div className="flex sm:flex-row xs:flex-col mb-6">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask any question about me..."
              className="bg-mywhite py-4 px-6 placeholder:text-tertiary placeholder:font-title text-primary font-body rounded-lg outline-none border-none font-medium flex-1 sm:mr-3 xs:mb-3 sm:mb-0"
            />
            <button 
              onClick={handleAsk}
              className="bg-mywhite py-3 px-8 w-fit text-tertiary font-bold shadow-md shadow-bigyellow/50 hover:bg-primary hover:text-secondary transition-all duration-300 rounded-xl"
            >
              Ask
            </button>
          </div>
          
          {answer && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="p-5 bg-bigyellow rounded-xl mt-4"
            >
              <p className="text-primary text-xl font-body tracking-wide">{answer}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(AIChat, "aiChat");