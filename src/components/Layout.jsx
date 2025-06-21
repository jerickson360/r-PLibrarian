// r-PLibrarian/src/components/Layout.jsx

import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import InfoPanel from './InfoPanel';
import { invoke } from '@tauri-apps/api/core';
import { emit } from '@tauri-apps/api/event';

function Layout() {
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigateTo = (path) => {
    if (path && path !== currentPath) {
      setHistory(prev => [...prev, currentPath]);
      setCurrentPath(path);
      setSelectedFile(null);
    }
  };

  const navigateBack = () => {
    if (history.length > 0) {
      const lastPath = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentPath(lastPath);
      setSelectedFile(null);
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
    // The main container is a vertical flex column (MenuBar on top, content below)
    <div className="flex flex-col h-screen font-sans text-gray-200 bg-gray-900">
      <MenuBar
        setLibraryPath={setCurrentPath}
        setHistory={setHistory}
        onNavigateBack={navigateBack}
        canNavigateBack={history.length > 0}
      />
      {/* This container is a HORIZONTAL flex row for the 3 columns */}
      <div className="flex flex-1 overflow-y-hidden">
        <Sidebar
          libraryPath={currentPath}
          files={files}
          onFolderClick={navigateTo}
        />
        <MainContent
          files={files}
          error={error}
          onFileClick={setSelectedFile}
          onFolderDoubleClick={navigateTo}
          selectedFile={selectedFile}
        />
        <InfoPanel
          file={selectedFile}
        />
      </div>
    </div>
  );
}

export default Layout;