import React, { useState, useEffect } from 'react';

const UserList = ({ apiUrl = 'https://jsonplaceholder.typicode.com/users' }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  if (loading) {
    return (
      <div data-testid="loading">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div data-testid="empty">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div data-testid="user-list">
      <h2>Users ({users.length})</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} data-testid={`user-${user.id}`}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
