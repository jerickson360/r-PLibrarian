// r-PLibrarian/src/components/MainContent.jsx

import React from 'react';
import { Folder, File as FileIcon, Star, MoreHorizontal } from 'lucide-react';

// Helper function to format file size
const formatSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

function MainContent({ files, error, onFileClick, onFolderDoubleClick, selectedFile }) {
  if (error) {
    return <div className="p-4 text-red-400">{error}</div>;
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
      <div className="flex-shrink-0 p-4 border-b border-gray-700/50">
        <h1 className="text-xl font-bold">File Browser</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-gray-900 z-10">
            <tr>
              <th className="p-2 w-10"><input type="checkbox" className="bg-gray-800 border-gray-600" /></th>
              <th className="p-2 font-semibold">Name</th>
              <th className="p-2 font-semibold w-32">Tags</th>
              <th className="p-2 font-semibold w-32">Rating</th>
              <th className="p-2 font-semibold w-40">Date Modified</th>
              <th className="p-2 font-semibold w-24">Size</th>
              <th className="p-2 font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => {
              const isSelected = selectedFile && selectedFile.path === file.path;
              return (
                <tr 
                  key={file.path} 
                  className={`border-b border-gray-800 cursor-pointer ${isSelected ? 'bg-accent-500/20' : 'hover:bg-gray-800'}`}
                  onClick={() => onFileClick(file)}
                  onDoubleClick={() => file.is_directory && onFolderDoubleClick(file.path)}
                >
                  <td className="p-2"><input type="checkbox" className="bg-gray-800 border-gray-600" /></td>
                  <td className="p-2 flex items-center min-w-0">
                    {file.is_directory ? (
                      <Folder size={18} className="mr-3 text-sky-400 flex-shrink-0" />
                    ) : (
                      <FileIcon size={18} className="mr-3 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </td>
                  <td className="p-2 text-gray-400"> {/* Placeholder for tags */} </td>
                  <td className="p-2 text-gray-400">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-gray-600" />)}
                    </div>
                  </td>
                  <td className="p-2 text-gray-400">{formatDate(file.modified)}</td>
                  <td className="p-2 text-gray-400">{file.is_directory ? '--' : formatSize(file.size)}</td>
                  <td className="p-2 text-gray-400"><MoreHorizontal size={16} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {files.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a library or folder.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;