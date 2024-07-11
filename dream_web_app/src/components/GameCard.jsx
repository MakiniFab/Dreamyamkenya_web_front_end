import { useState, useEffect } from 'react';
import './components.css';

function GameCard({ stake, selectGameCard }) {
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

        setUsers(onlineUsers);
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

  return (
    <div className='gc__gameCard-container'>
      <div className='gc__gameCard-loadingStatue'>
        <button onClick={() => selectGameCard(stake)}>Back</button>
        <h2>Game amount {stake}</h2>
        <p>Pairing with opponent...</p>
        <br />
      </div>
      <div className='gc__gameCard-waitingList'>
        <p>Search for a friend?</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username || 'No username'}</li>
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
