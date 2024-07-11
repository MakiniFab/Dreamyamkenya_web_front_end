import { useState, useEffect } from 'react';
import './components.css'

function GameCard({stake, selectGameCard}) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlltUsers = () => {
        
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
            'Authorization': `Bearer ${token}`
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            setUsers(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      };

    useEffect(() => {
        fetchAlltUsers();
        console.log(users)
    }, []);

    return (
        <div className='gc__gameCard-container' >
            <div className='gc__gameCard-loadingStatue'>
                <button onClick={() => 
                        selectGameCard(stake)}>Back
                </button>
                    <h2>Game amount {stake}</h2>
                    <p>Pairing with opponent...</p><br />
            </div>
            <div className='gc__gameCard-waitingList' >
                <p>Searchh for friend?</p>
                    {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : users ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} >{user.username}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No users data available</p>
                )}
            </div>
        </div>          
    );
}

export default GameCard;