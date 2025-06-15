import React from 'react';
import { PanelRightOpen, PanelRightClose, Info } from 'lucide-react';

function InfoPanel({ isOpen, setIsOpen }) {
  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-20 bg-gray-700 hover:bg-accent-500 cursor-pointer p-2 rounded-l-lg transition-all duration-300 ${isOpen ? 'right-[384px]' : 'right-0'}`}
      >
        {isOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
      </div>
      <aside 
        className={`fixed top-0 bottom-0 z-10 w-96 bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ right: 0 }}
      >
        <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-bold mb-4 flex items-center">
                <Info size={18} className="mr-2"/>
                Information
            </h2>
            <div className="flex-grow bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 text-center p-4">Select a file to see its metadata.</p>
            </div>
        </div>
      </aside>
    </>
  );
}

export default InfoPanel;