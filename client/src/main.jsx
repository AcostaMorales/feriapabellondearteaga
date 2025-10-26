import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/registerNotificationSW.js'

// Registrar Service Worker para PWA y Push
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Registrar SW principal de PWA
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ SW PWA registered:', registration);
      
      // Registrar SW de push notifications
      const pushRegistration = await navigator.serviceWorker.register('/sw-push.js');
      console.log('✅ SW Push registered:', pushRegistration);
      
    } catch (error) {
      console.error('❌ SW registration failed:', error);
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
