import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import { App } from './App';
import 'react-toastify/dist/ReactToastify.css';
console.log('oi')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
