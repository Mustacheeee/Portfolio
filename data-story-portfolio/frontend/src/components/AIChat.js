import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AIChat = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const handleAsk = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: question }),
        });
        const data = yield response.json();
        setAnswer(data.answer);
    });
    return (_jsxs("div", { className: "ai-chat", children: [_jsx("h2", { children: "Ask Me Anything" }), _jsx("input", { type: "text", value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "Ask a question about me..." }), _jsx("button", { onClick: handleAsk, children: "Ask" }), answer && _jsx("div", { className: "answer", children: answer })] }));
};
export default AIChat;
