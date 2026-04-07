import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

if (typeof window !== 'undefined' && import.meta.env.PROD) {
  console.log(
    '%c👋 Hey there, curious developer!',
    'font-size: 16px; font-weight: bold; color: #f8df51;'
  );
  console.log(
    '%cThis portfolio was built with React, Three.js, and Framer Motion.\nLike what you see? Let\'s connect → linkedin.com/in/yixin-zhao-/',
    'font-size: 12px; color: #ebe1d7;'
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)