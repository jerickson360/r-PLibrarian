import React from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { emit } from '@tauri-apps/api/event';
import { FolderOpen, FolderPlus, Terminal } from 'lucide-react';

function MenuBar({ setLibraryPath, setHistory }) {
  const handleOpenConsole = async () => {
    await invoke('open_console_window');
    await emit('log_message', 'Console window opened.');
  };

  // This one function handles both "Create" and "Open"
  const handleSelectLibrary = async () => {
    try {
      const selectedPath = await open({
        directory: true,
        multiple: false,
        title: 'Select a Library Folder'
      });

      if (selectedPath) {
        await emit('log_message', `Library selected at: ${selectedPath}`);
        setHistory([]);
        setLibraryPath(selectedPath);
      } else {
        await emit('log_message', 'User cancelled library selection.');
      }
    } catch (e) {
      console.error("Failed to open directory dialog:", e);
      await emit('log_message', `Error opening dialog: ${e}`);
    }
  };

  return (
    <div className="flex items-center p-2 bg-gray-950 border-b border-700/50 space-x-2">
      <button 
        onClick={handleSelectLibrary}
        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
        title="Create a new library from an existing folder"
      >
        <FolderPlus size={16} className="mr-2" />
        Create Library
      </button>
      <button 
        onClick={handleSelectLibrary}
        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
        title="Open an existing library folder"
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