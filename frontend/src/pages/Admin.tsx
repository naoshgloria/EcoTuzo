import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Admin2 from '../components/Admin2';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

interface AdminDashboardProps {
    adminId: string;
  }
const Admin:  React.FC<AdminDashboardProps> = ({ adminId })  => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: shops = [] } = useQuery(['shopsByAdmin', adminId], () => apiClient.fetchShopsByAdmin(adminId));


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen gap-4 bg-green-200">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
      <div className="flex flex-col flex-1 gap-3">
        <header className="p-4 bg-white shadow-md">
          <button 
            className="block p-2 text-green-600 rounded-md lg:hidden hover:text-green-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-green-900"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>
        <main className="p-4 overflow-y-auto flex-4 pr-7">
          <Admin2 shops={shops}/>
        </main>
      </div>
    </div>
  );
};

export default Admin;
