import { useState, useEffect } from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

function GameCard({currentUser, setVisibleGameCard, updateStatus, setAmountStake}){
    const navigate = useNavigate();
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
            //find current user
            const currentUserInList = onlineUsers.find((user) => user.id === currentUser.id)
            const currentUserAmount = currentUserInList ? currentUserInList.amount : null

            //sort
            const sortedUsers = onlineUsers.sort((a, b)=> {
              if (a.amount === currentUserAmount && b.amount !== currentUserAmount) {
                return -1
              } else if (a.amount !== currentUserAmount && b.amount === currentUserAmount) {
                return 1
              } else {
                return 0
              }
            })
            setUsers(sortedUsers);
            setLoading(false);

            const pairedUser = sortedUsers.find((user) => user.amount === currentUserAmount && user.id !== currentUser.id)
            if (pairedUser) {
              updateStatus(currentUser.id, "offline")
              updateStatus(pairedUser.id, "offline")
              navigate('/game')
            } else {
              console.log("unpaired")
            }
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
      updateStatus(currentUser.id, "offline")
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