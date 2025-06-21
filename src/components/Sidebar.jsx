// r-PLibrarian/src/components/Sidebar.jsx

import React from 'react';
import { Folder } from 'lucide-react';

function Sidebar({ libraryPath, files, onFolderClick }) {
  const directories = files ? files.filter(file => file.is_directory) : [];

  return (
    // This is the left-hand column
    <aside className="w-64 bg-gray-900 p-4 flex-shrink-0 flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 flex-shrink-0">SIDEBAR GOES HERE</h2>
        {libraryPath ? (
          <div>
            <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Folders in Current Path</p>
            {directories.length > 0 ? (
              <ul className="space-y-1">
                {directories.map(dir => (
                  <li key={dir.path}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onFolderClick(dir.path);
                      }}
                      className="flex items-center p-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      <Folder size={16} className="mr-3 text-sky-400 flex-shrink-0" />
                      <span className="truncate">{dir.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No subfolders.</p>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center text-center">
            <p className="text-gray-500">Open a library to get started.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;