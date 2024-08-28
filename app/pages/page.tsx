"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("pages/api/users?id=-1").then(res => {
      console.log(res.data.users)
      setUsers(res.data.users)})    
  }, []);

  const deleteUser = async (id: number) => {
    axios.delete(`/pages/api/users/`, { data: JSON.stringify({id}) });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link className="bg-blue-500 text-white px-4 py-2 rounded" href="/pages/add-user">
        Add New User
      </Link>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>
              {user.name} - {user.email}
            </span>
            <div>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <Link className="bg-green-500 text-white px-4 py-2 rounded" href={`/pages/edit-user/${user.id}`}>
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}