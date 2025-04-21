import React, { useState } from 'react';
import { fadeIn, textVariant } from "../constants/motion.js";
import { motion } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('https://portfolio-backend-gdna.onrender.com/ask', {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-mywhite mt-16 text-center md:text-[60px] xl:ml-0 sm:text-[50px] sm:ml-3 xs:text-[20px] xs:tracking-tight text-[30px] xs:ml-3">Ask Me Anything About &nbsp;  
          <span className='text-highlight'>Fiona</span></h2>
      </motion.div>
  
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-10 sm:mt-20 mb-24 sm:mb-48 min-h-80 text-secondary text-[17px] leading-[30px] px-4"
      >
        <div className="bg-tertiary p-8 rounded-2xl shadow-bigyellow shadow-md w-full max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch items-center">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Any question about me(skills, hobbies, etc.)!"
              className="bg-mywhite py-4 text-[12px] xs:tracking-tight sm:text-[12px] md:text-[15px] px-6 placeholder:text-tertiary sm:placeholder:font-title placeholder:font-body text-primary font-body rounded-lg outline-none border-none font-medium w-full sm:flex-1"
            />
            <button 
              onClick={handleAsk}
              className="bg-mywhite py-3 px-8 text-tertiary font-bold shadow-md shadow-bigyellow/50 hover:bg-primary hover:text-secondary transition-all duration-300 rounded-xl w-full sm:w-auto sm:self-auto self-center"
            >
              Ask
            </button>
          </div>
          
          {(loading || answer) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="p-5 bg-bigyellow rounded-xl mt-4"
            >
              {loading ? (
                <p className="text-primary text-md font-body tracking-wide">
                  <span className="animate-bounce">Thinking</span>
                  <span className="animate-pulse">...</span>
                </p>
              ) : (
                <p className="text-primary text-md font-body tracking-wide">{answer}</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(AIChat, "aiChat");