import React from 'react';

function Sidebar({ libraryPath }) {
  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex-shrink-0">
      <h2 className="text-lg font-bold mb-4">Library</h2>
      {libraryPath ? (
        <div>
            <p className="text-gray-400 text-sm mb-1">Current Path:</p>
            <p className="text-sm font-mono bg-gray-900 p-2 rounded break-words">{libraryPath}</p>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No library opened.</p>
      )}
    </aside>
  );
}

export default Sidebar;