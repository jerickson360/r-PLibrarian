import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import InfoPanel from './InfoPanel';

function Layout() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200">
      <MenuBar />
      <div className="flex flex-grow overflow-hidden relative">
        <Sidebar />
        <MainContent />
        <InfoPanel isOpen={isPanelOpen} setIsOpen={setIsPanelOpen} />
      </div>
    </div>
  );
}

export default Layout;