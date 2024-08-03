import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentUser } from '../api-client';



interface SidebarProps {
  isOpen: boolean;

  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchCurrentUser();
        setUser(fetchedUser);
      } catch (error) {
        console.log("")
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* Sidebar for small devices */}
      <div className={`fixed md:hidden inset-y-0 left-0 z-30 flex-1 overflow-y-auto transition duration-300 transform bg-white border-r lg:static lg:inset-0 ${isOpen ? 'translate-x-0 ease-out flex-1' : '-translate-x-full ease-in'}`}>
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-green-700">Admin Dashboard</span>
          </div>
        </div>
        <nav className="mt-10">

          <a className="flex items-center px-6 py-2 text-green-700 bg-gray-100" href="/ECommerces">
            <Link to="/ECommerce">
              <span className="mx-3">Dashboard</span>
            </Link>

          </a>

          <a className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-green-100 hover:text-greeny-700" href="/user">
            <Link to={'/user'}>
              <span className="mx-3">User</span>
            </Link>
          </a>
          <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-green-100 hover:text-green-700" href="/order">
            <Link to={'/order'}>
              <span className="mx-3">Order/Rewards</span>
            </Link>
          </a>
          <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-green-100 hover:text-green-700" href="/order">
            <Link to={'/UserRating'}>
              <span className="mx-3">Rating</span>
            </Link>
          </a>




        </nav>
      </div>

      {/* Sidebar for larger devices */}

      <div className={`fixed inset-y-0 left-0 overflow-y-auto transition duration-300 transform bg-white border-r sm:static sm:inset-1 ${!isOpen ? 'translate-x-0 ease-in block w-50' : '-translate-x-2 ease-out'}`}>
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-green-700"> Dashboard</span>
          </div>
        </div>
        <nav className="mt-10">
          {user?.role === "admin" && (
            <>
            <a className="flex items-center px-6 py-2 text-green-700 bg-green-100" href="/ECommerces">
            <Link to="/ECommerce">
              <span className="mx-3">Dashboard</span>
            </Link>

          </a>
            <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-gray-100 hover:text-green-700" href="/user">
              <Link to={'/user'}>
                <span className="mx-3">User</span>
              </Link>
            </a>
            <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-gray-100 hover:text-green-700" href="/order">
            <Link to={'/order'}>
              <span className="mx-3">Bottles</span>
            </Link>
          </a>
          </>
          )}
          


          
          <a className="flex items-center px-6 py-2 mt-4 text-green-600 hover:bg-geen-100 hover:text-green-700" href="/order">
            <Link to={'/UserRating'}>
              <span className="mx-3">Rating</span>
            </Link>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
