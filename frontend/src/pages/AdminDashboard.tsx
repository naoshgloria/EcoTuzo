// src/components/AdminDashboard.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { Shop } from '../api-client';
import ShopTable from './ShopTable';
import Admin2 from '../components/Admin2';

interface AdminDashboardProps {
  adminId: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminId }) => {
  const { data: shops = [] } = useQuery(['shopsByAdmin', adminId], () => apiClient.fetchShopsByAdmin(adminId));

  return (
    <div>
      
      <h2>Total Shops Managed: {shops.length}</h2>
      <Admin2 shops={shops} />
    </div>
  );
};

export default AdminDashboard;
