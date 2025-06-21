// src/components/Console.jsx

import React, { useRef, useEffect } from 'react';

function Console({ logs }) {
  const endOfLogsRef = useRef(null);
  
  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  
  return (
    <div className="bg-gray-900 text-gray-200 h-screen flex flex-col p-2 font-mono text-sm">
      <h1 className="text-lg p-2 border-b border-gray-700">Debug Console</h1>
      <div className="flex-grow overflow-y-auto p-2">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
        <div ref={endOfLogsRef} />
      </div>
    </div>
  );
}

export default Console;