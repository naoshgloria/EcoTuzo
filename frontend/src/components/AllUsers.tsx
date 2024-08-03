import React, { useState, useEffect } from "react";
import { fetchMyshops } from "../api-client";
import { shopType } from "../../../backend/src/shared/types";

interface User {
  _id: string;
  username: string;
  email: string;
  status: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [shop, setShop] = useState<shopType[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedShop = await fetchMyshops();
        setShop(fetchedShop);
        console.log(fetchUsers)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:7012/api/users/allUser`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching shops");
      }
      setUsers(await response.json());
      //return response.json();
    } catch (error) {
      
      console.log(error);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:7012/api/users/${userId}/approve`,
        {
          method: 'POST', // Assuming it's a POST request, adjust if necessary
          credentials: 'include'
        }
      );
  
      if (!response.ok) {
        throw new Error("Error approving user");
      }
  
      const data = await response.json();
      console.log(data);
  
      // Refresh users list
      fetchUsers();
  
      return data;
    } catch (error) {
      
      console.log(error);
    }
  };
  

  const handleReject = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:7012/api/users/${userId}/reject`,
        {
          method: 'POST', // Assuming it's a POST request, adjust accordingly
          credentials: 'include'
        }
      );
      
      if (!response.ok) {
        throw new Error("Error fetching shops");
      }
      
      const data = await response.json();
      fetchUsers();
      console.log(data);
      return data;
      
      
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        <td className="px-4 py-2 border">{shop?.code}</td>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{shop?.code}</td>
              <td className="px-4 py-2 border">{user.status}</td>
              <td className="px-4 py-2 border">
                <button
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded"
                  onClick={() => handleApprove(user._id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded"
                  onClick={() => handleReject(user._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
