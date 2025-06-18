import React from 'react';
import { PanelRightOpen, PanelRightClose, Info, Folder, File as FileIcon } from 'lucide-react';

function InfoPanel({ isOpen, setIsOpen, file }) {
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
            {file ? (
                <div className="flex-grow space-y-3">
                    <div className="flex items-center text-lg">
                        {file.is_directory ? (
                            <Folder size={20} className="mr-3 text-sky-400 flex-shrink-0"/>
                        ) : (
                            <FileIcon size={20} className="mr-3 text-gray-400 flex-shrink-0"/>
                        )}
                        <span className="font-bold truncate">{file.name}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Path</p>
                        <p className="text-sm font-mono bg-gray-900 p-2 rounded break-words">{file.path}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p>{file.is_directory ? 'Folder' : 'File'}</p>
                    </div>
                </div>
            ) : (
                 <div className="flex-grow bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600 text-center p-4">Select an item to see its metadata.</p>
                </div>
            )}
        </div>
      </aside>
    </>
  );
}

export default InfoPanel;