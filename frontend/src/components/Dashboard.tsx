import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className='w-full flex-2'>
      <h1 className="text-3xl font-semibold text-green-700">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="mt-2 text-3xl font-bold">234</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="mt-2 text-3xl font-bold">567</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">New Signups</h2>
          <p className="mt-2 text-3xl font-bold">89</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Bottles</h2>
          <p className="mt-2 text-3xl font-bold">12,345</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

