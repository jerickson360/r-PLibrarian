// r-PLibrarian/src/components/MenuBar.jsx

import React from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { emit } from '@tauri-apps/api/event';
import { FolderOpen, Terminal, ArrowLeft, Search } from 'lucide-react';

function MenuBar({ setLibraryPath, setHistory, onNavigateBack, canNavigateBack }) {
    const handleOpenConsole = async () => {
        await invoke('open_console_window');
        await emit('log_message', 'Console window opened.');
    };

    const handleSelectLibrary = async () => {
        try {
            const selectedPath = await open({
                directory: true,
                multiple: false,
                title: 'Select a Library Folder'
            });
            if (typeof selectedPath === 'string') {
                await emit('log_message', `Library selected at: ${selectedPath}`);
                setHistory([]);
                setLibraryPath(selectedPath);
            }
        } catch (e) {
            console.error("Failed to open directory dialog:", e);
            await emit('log_message', `Error opening dialog: ${e}`);
        }
    };

    return (
        <header className="flex items-center p-2 bg-gray-950 border-b border-gray-700/50 space-x-2 flex-shrink-0">
            {/* Navigation and Library Controls */}
            <button
                onClick={onNavigateBack}
                disabled={!canNavigateBack}
                className="p-2 bg-gray-700 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-accent-500"
                title="Go back"
            >
                <ArrowLeft size={16} />
            </button>
            <button 
                onClick={handleSelectLibrary}
                className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
                title="Open an existing library folder"
            >
                <FolderOpen size={16} className="mr-2" />
                Open Library
            </button>

            {/* Search Bar - as per proposal section 3.3 */}
            <div className="flex-grow flex justify-center">
                <div className="w-1/2 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text"
                        placeholder="Search files, folders, or tags..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500"
                    />
                </div>
            </div>

            {/* Console Button */}
            <button 
                onClick={handleOpenConsole}
                className="flex items-center px-3 py-1 bg-gray-700 hover:bg-accent-500 rounded-md text-sm transition-colors"
            >
                <Terminal size={16} className="mr-2" />
                Console
            </button>
        </header>
    );
}

export default MenuBar;