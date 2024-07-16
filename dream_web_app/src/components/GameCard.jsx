import { useState, useEffect } from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

function GameCard({currentUser, fetchCurrentUser, updateStatus, updateBalance, updateAmount, setVisibleGameCard}){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
      fetchCurrentUser();
    }, []);

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
            const currentUserWins = currentUserInList ? currentUserInList.wins : null

            //sort
            const sortedUsers = onlineUsers.sort((a, b)=> {
              if (a.amount === currentUserAmount && b.amount !== currentUserAmount) {
                return -1
              } else if (a.amount !== currentUserAmount && b.amount === currentUserAmount) {
                return 1
              } else if (a.wins === currentUserWins && b.wins !== currentUserWins) {
                return -1
              } else if (a.wins !== currentUserWins && b.wins === currentUserWins) {
                return 1
              } else {
                return 0
              }
            })
            setUsers(sortedUsers);
            setLoading(false);

            const pairedUser = sortedUsers.find((user) => user.amount === currentUserAmount && 
            user.wins === currentUserWins && user.id !== currentUser.id)
            if (pairedUser) {
              updateStatus(currentUser.id, "offline")
              updateStatus(pairedUser.id, "offline")
              const newBalance = currentUser.balance - parseFloat(currentUserAmount)
              const pairBalance = pairedUser.balance - parseFloat(currentUserAmount)
              updateBalance(currentUser.id, newBalance)
              updateBalance(pairedUser.id, pairBalance)
              navigate('/game', {state: {pairedUser}})
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
    }, [currentUser, token, navigate, updateStatus, updateBalance]);

    function combinedDuty() {
      updateStatus(currentUser.id, "offline")
      updateAmount(currentUser.id, 0)
      setVisibleGameCard(null)
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
            {user.username || 'No username'} - Stake: {currentUser.amount || 'Not specified'}
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