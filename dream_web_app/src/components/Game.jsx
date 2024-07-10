// src/components/CurrentUser.js

import React, { useState, useEffect } from 'react';

const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/current_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // You may need to include authentication headers here if required
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="current-user">
      <h2>Current User Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Wins:</strong> {user.wins}</p>
          <p><strong>Balance:</strong> {user.balance}</p>
          {/* Add other user attributes as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default CurrentUser;
