import React, { useState, useEffect } from "react";
import { listen } from '@tauri-apps/api/event';
import Layout from "./components/Layout";
import Console from "./components/Console";
import { appWindow } from "@tauri-apps/api/window";

function App({ windowLabel }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // This effect runs in all windows, but only the console window will display the logs.
    const unlisten = listen('log_message', (event) => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prevLogs => [...prevLogs, `[${timestamp}] ${event.payload}`]);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unlisten.then(f => f());
    };
  }, []);

  // Simple routing based on the window label defined in tauri.conf.json
  if (windowLabel === 'debug_console') {
    return <Console logs={logs} />;
  }
  
  // The main application window
  return <Layout />;
}

export default App;