import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ This is required

import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App'; 

// import reportWebVitals from './reportWebVitals';
// by default it might be "unregister()"
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import swDev from "./swDev";
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </>
);
 
swDev();
// serviceWorkerRegistration.register();
// reportWebVitals();
