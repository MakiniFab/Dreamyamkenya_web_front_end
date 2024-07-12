import { useState, useEffect } from 'react';
import './components.css';

function GameCard({currentUser, setVisibleGameCard, updateStatus, setAmountStake}){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
        if (!token || token.split('.').length !== 3) {
        setError('Invalid token');
        setLoading(false);
        return;
        }

    const fetchAllUsers = () => {
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
    }

    useEffect(() => {
      fetchAllUsers();
    }, []);

    function combinedDuty() {
      setVisibleGameCard(null);
      updateStatus("offline");
      setAmountStake(0); 
    }

    return (
      <div className='gc__gameCard-container' >
        <div>
          <button onClick={combinedDuty} >back</button>
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
            <li key={user.id}>
            {user.username || 'No username'} - Stake: {user.amount || 'Not specified'}
            </li>
            ))}
            </ul>
            ) : (
            <p>No users available</p>
          )}
            </div>
      </div>
    )
}

export default GameCard;