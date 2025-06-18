import React from 'react';
import { Folder, File as FileIcon } from 'lucide-react';

function MainContent({ files, error, onFileClick, onFolderDoubleClick, selectedFile }) {

  if (error) {
    return (
      <main className="flex-grow p-4 overflow-auto flex items-center justify-center">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
            <p className="font-bold">An error occurred:</p>
            <p>{error}</p>
        </div>
      </main>
    )
  }

  if (files.length === 0) {
    return (
      <main className="flex-grow p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">File Browser</h1>
        <div className="w-full h-96 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Open a library to see files here.</p>
        </div>
      </main>
    );
  }

  const handleItemClick = (file) => {
    onFileClick(file);
  }
  
  const handleItemDoubleClick = (file) => {
    if (file.is_directory) {
      onFolderDoubleClick(file.path);
    }
  }

  return (
    <main className="flex-grow p-4 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">File Browser</h1>
      <div className="space-y-1">
        {files.map(file => {
          const isSelected = selectedFile && selectedFile.path === file.path;
          return (
            <div 
              key={file.path} 
              className={`flex items-center p-2 rounded-md cursor-pointer ${isSelected ? 'bg-accent-500/30' : 'hover:bg-gray-800'}`}
              onClick={() => handleItemClick(file)}
              onDoubleClick={() => handleItemDoubleClick(file)}
            >
              {file.is_directory ? (
                <Folder size={18} className="mr-3 text-sky-400 flex-shrink-0" />
              ) : (
                <FileIcon size={18} className="mr-3 text-gray-400 flex-shrink-0" />
              )}
              <span className="truncate">{file.name}</span>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default MainContent;