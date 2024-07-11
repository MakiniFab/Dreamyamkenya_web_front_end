import { useState, useEffect } from 'react';
import './components.css';

function GameCard({ stake, selectGameCard, user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllUsers = () => {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      setError('Invalid token');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        const onlineUsers = Array.isArray(data.users)
          ? data.users.filter((user) => user.status === 'online')
          : [];

        // Sort users such that users with the same stake as the selected stake appear at the top
        const sortedUsers = onlineUsers.sort((a, b) => {
          const isAStakeMatch = a.stake === stake;
          const isBStakeMatch = b.stake === stake;

          if (isAStakeMatch && !isBStakeMatch) return -1;
          if (!isAStakeMatch && isBStakeMatch) return 1;

          return 0;
        });

        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const updateStatus = async (status) => {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      setError('Invalid token');
      return;
    }
    if (!user || !user.id) {
      console.error("User id not available")
      return
    }

    try {
      await fetch(`http://localhost:5000/status/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({status})
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  function combinedDuty() {
    updateStatus("offline")
    selectGameCard(null)

  }

  return (
    <div className='gc__gameCard-container'>
      <div className='gc__gameCard-loadingStatue'>
        <button onClick={combinedDuty}>Back</button>
        <h2>Game amount {stake}</h2>
        <p>Pairing with opponent...</p>
        <br />
      </div>
      <div className='gc__gameCard-waitingList'>
        {user && user.status === 'online' && (
          <div className='gc__gameCard-user'>
            <h3>Logged In User: {user.username}</h3>
          </div>
        )}
        <p>Search for a friend?</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username || 'No username'} - Stake: {user.stake || 'Not specified'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
}

export default GameCard;
