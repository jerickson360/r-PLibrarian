// src/components/Layout.jsx

import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import InfoPanel from './InfoPanel';
import { invoke } from '@tauri-apps/api/core';
import { emit } from '@tauri-apps/api/event';

function Layout() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigateTo = (path) => {
    if (path && path !== currentPath) {
      setHistory(prev => [...prev, currentPath]);
      setCurrentPath(path);
    }
  };

  const navigateBack = () => {
    if (history.length > 0) {
      const lastPath = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentPath(lastPath);
    }
  };

  useEffect(() => {
    if (currentPath) {
      setError(null);
      invoke('list_directory_contents', { path: currentPath })
        .then(fileList => {
          fileList.sort((a, b) => {
            if (a.is_directory !== b.is_directory) return a.is_directory ? -1 : 1;
            return a.name.localeCompare(b.name);
          });
          setFiles(fileList);
        })
        .catch(err => {
          const errorMsg = `Error listing directory: ${err}`;
          setError(errorMsg);
          emit('log_message', errorMsg);
        });
    } else {
      setFiles([]);
    }
  }, [currentPath]);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-200">
      <MenuBar
        setLibraryPath={setCurrentPath}
        setHistory={setHistory}
        onNavigateBack={navigateBack}
        canNavigateBack={history.length > 0}
      />
      {/* The key change is here: InfoPanel is no longer inside the main flex container */}
      <div className="flex flex-grow overflow-hidden">
        <Sidebar libraryPath={currentPath} files={files} onFolderClick={navigateTo} />
        <MainContent
          files={files}
          error={error}
          onFileClick={setSelectedFile}
          onFolderDoubleClick={navigateTo}
          selectedFile={selectedFile}
        />
      </div>
      {/* InfoPanel is now a sibling to the main content area, allowing it to float over it */}
      <InfoPanel
        isOpen={isPanelOpen}
        setIsOpen={setIsPanelOpen}
        file={selectedFile}
      />
    </div>
  );
}

export default Layout;