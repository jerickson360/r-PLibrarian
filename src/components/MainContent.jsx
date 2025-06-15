import React from 'react';

function MainContent() {
  return (
    <main className="flex-grow p-4 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">File Browser</h1>
      <div className="w-full h-96 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">File list will appear here in Phase 2.</p>
      </div>
    </main>
  );
}

export default MainContent;