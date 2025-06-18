// src/console.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { listen } from '@tauri-apps/api/event';

// This path correctly points from 'src/' to 'src/components/'
import Console from './components/Console'; 
import './index.css';

// This is the root component for the console window
function ConsoleApp() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Listen for the 'log_message' event from anywhere in the app
    const unlisten = listen('log_message', (event) => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `[${timestamp}] ${event.payload}`]);
    });

    // Cleanup listener on component unmount
    return () => {
      unlisten.then(fn => fn());
    };
  }, []);

  return <Console logs={logs} />;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConsoleApp />
  </React.StrictMode>
);