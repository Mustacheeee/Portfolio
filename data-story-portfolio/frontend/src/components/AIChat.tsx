import React, { useState } from 'react';

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
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer("抱歉，暂时无法获取回答");
    }
  };

  return (
    <div className="ai-chat">
      <h2>Ask Me Anything</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about me..."
      />
      <button onClick={handleAsk}>Ask</button>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
};

export default AIChat;