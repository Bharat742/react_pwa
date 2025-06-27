// src/Components/Users.js

import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('Online');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        localStorage.setItem("Users", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        setMode('Offline');
        let collection = localStorage.getItem("Users");
        setUsers(JSON.parse(collection));

        console.error("Error fetching users (in catch):", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if(!users) return <p>No data found!</p>
  return (
    <div>
        <div>
            {
                mode === 'Offline'?
                <div>You'r in Offline mode</div> :
                null
            }
        </div>
      <h1>User List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
              </td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
