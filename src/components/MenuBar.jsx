import React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { emit } from '@tauri-apps/api/event';
import { FolderOpen, Terminal } from 'lucide-react';

function MenuBar() {
  const handleOpenConsole = async () => {
    await invoke('open_console_window');
    await emit('log_message', 'Console window opened.');
  };

  const handleOpenLibrary = async () => {
     // This will be implemented in Phase 2
    console.log("Open Library clicked");
    await emit('log_message', 'User clicked "Open Library". Functionality pending.');
  };

  return (
    <div className="flex items-center p-2 bg-gray-800 border-b border-gray-700 space-x-2">
      <button 
        onClick={handleOpenLibrary}
        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
      >
        <FolderOpen size={16} className="mr-2" />
        Open Library
      </button>
      <button 
        onClick={handleOpenConsole}
        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
      >
        <Terminal size={16} className="mr-2" />
        Console
      </button>
    </div>
  );
}

export default MenuBar;