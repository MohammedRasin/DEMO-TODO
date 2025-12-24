import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token1');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:7000/api/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);

      return res.data.data || [];
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async id => {
      console.log('de', token);
      return axios.delete(`http://localhost:7000/api/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {data.map(user => (
        <div
          key={user._id}
          className="flex justify-between items-center bg-gray-100 p-4 mb-3 rounded"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500">Role: {user.role}</p>
          </div>

          <button
            onClick={() => deleteUser(user._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
