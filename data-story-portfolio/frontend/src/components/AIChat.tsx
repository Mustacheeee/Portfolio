import React, { useState } from 'react';
import { fadeIn, textVariant } from "../constants/motion.js";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "src/hoc/index.js";

const ThinkingDots = () => (
  <span className="inline-flex items-center gap-1 ml-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-primary/60"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: i * 0.12,
          ease: [0.25, 1, 0.5, 1],
        }}
      />
    ))}
  </span>
);

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('https://portfolio-backend-gdna.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-mywhite mt-16 text-center md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Ask Me Anything About{' '}
          <span className='text-highlight'>Fiona</span>
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-10 sm:mt-20 mb-24 sm:mb-48 min-h-80 text-secondary text-base leading-relaxed px-4"
      >
        <div className="bg-tertiary p-6 sm:p-8 rounded-2xl shadow-bigyellow/10 shadow-lg w-full max-w-4xl mx-auto border border-mywhite/5">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch items-stretch">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Skills, hobbies, experience..."
              className="bg-mywhite py-4 text-base px-5 placeholder:text-tertiary/70 placeholder:font-body text-primary font-body rounded-lg outline-none border-2 border-transparent font-medium w-full sm:flex-1 min-h-[48px] focus-visible:border-highlight/50 transition-all duration-200"
              aria-label="Ask a question about Fiona"
            />
            <motion.button
              onClick={handleAsk}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="bg-mywhite py-3 px-8 text-tertiary font-bold shadow-md shadow-bigyellow/20 hover:bg-primary hover:text-secondary transition-all duration-300 rounded-xl min-h-[48px] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-highlight"
            >
              Ask
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {(loading || answer) && (
              <motion.div
                key={loading ? "loading" : "answer"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="p-5 bg-bigyellow rounded-xl mt-4"
              >
                {loading ? (
                  <p className="text-primary text-base font-body tracking-wide flex items-center">
                    Thinking<ThinkingDots />
                  </p>
                ) : (
                  <p className="text-primary text-base font-body tracking-wide leading-relaxed">{answer}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(AIChat, "aiChat");
