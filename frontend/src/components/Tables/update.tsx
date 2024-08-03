import { useState, useEffect } from "react";
import { UserType } from "../../../../backend/src/shared/types";

type Props = {
  user: UserType;
  onClose: () => void;
};

const UpdateUserPage = ({ user, onClose }: Props) => {
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7012/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }

      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-green-950 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-semibold">Update User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Role</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-block px-6 py-2 text-green-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-block px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
