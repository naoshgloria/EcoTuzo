import React from 'react';

interface SidebarProps {
  
  sidebarOpen:any;
  setSidebarOpen:(sidebarOpen:any) => void;
  
}

const Sidebar: React.FC<SidebarProps> = ({ setSidebarOpen , sidebarOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white border-r lg:static lg:inset-0 ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-green-700"></span>
        </div>
      </div>
      <nav className="mt-10">
        <a className="flex items-center px-6 py-2 text-green-700 bg-gray-100" href="#">

          <span onClick={() =>setSidebarOpen(!sidebarOpen)} className="mx-3"></span>
        </a>
        <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-gray-100 hover:text-green-700" href="#">
          <span className="mx-3"></span>
        </a>
        <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-gray-100 hover:text-green-700" href="#">
          <span className="mx-3"></span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
