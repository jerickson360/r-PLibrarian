// r-PLibrarian/src/components/InfoPanel.jsx

import React from 'react';
import { Info } from 'lucide-react';

const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function InfoPanel({ file }) {
  // All fixed positioning and toggle logic is removed.
  // This is now a simple component that fits inside a flex container.
  return (
    <aside className="w-80 bg-gray-850 p-4 border-l border-gray-700/50 flex-shrink-0 flex flex-col">
      <h2 className="text-lg font-bold mb-4 flex items-center flex-shrink-0">
        <Info size={18} className="mr-2" />
        INFORMATION
      </h2>
      
      {file ? (
        <div className="flex-grow overflow-y-auto space-y-4 text-sm">
          <div className="w-full h-52 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
            <p className="text-gray-500">THUMBNAIL 200x200PX</p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 uppercase">SIZE:</p>
              <p className="font-semibold">{file.is_directory ? '--' : formatSize(file.size)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">FILE TYPE:</p>
              <p className="font-semibold">{file.is_directory ? 'Folder' : 'File'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">MODIFIED DATE:</p>
              <p className="font-semibold">{new Date(file.modified).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">PATH:</p>
              <p className="font-mono bg-gray-900 p-2 rounded break-words text-xs">{file.path}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">TAGS:</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-center text-gray-500">
          <p>Select an item to view details</p>
        </div>
      )}
    </aside>
  );
}

export default InfoPanel;