import { useState, useEffect } from 'react';

import Mpesa from './Mpesa';
import './backendComponents.css';
import GameCard from '../components/GameCard';

const UserProfile = ({ fetchCurrentUser, user, loading, error }) => {
  const [mpesaVisible, setMpesaVisible] = useState(false);
  const [visibleGameCard, setVisibleGameCard] = useState(null);
  const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      setError('Invalid token');
      return;
    }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  function showMpesa() {
    setMpesaVisible(!mpesaVisible);
  }

  const updateStatus = async (status) => {
    if (!user || !user.id) {
      console.error("User id not available");
      return;
    }

    try {
      await fetch(`http://localhost:5000/status/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setAmountStake = async (amount) => {
    if (!user || !user.id) {
      console.error("User id not available");
      return;
    }

    try {
      await fetch(`http://localhost:5000/amount/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function selectGameCard(stake) {
    if (visibleGameCard === stake) {
      setVisibleGameCard(null);
    } else {
      setVisibleGameCard(stake);
      updateStatus("online");
      setAmountStake(stake); 
    }
  }

  return (
    <div className='gc__profile-container'>
      <div className='gc__profile-container-top'>
        <div className='gc__profile-card'>
          <h2>Current User Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : user ? (
            <div className='gc__profile-card-details'>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Phone Number:</strong> {user.phone_number}</p>
              <p><strong>Balance:</strong> {user.balance}</p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>
        <div className='gc__profile-mpesa'>
          <div>
            <button onClick={showMpesa}>
              {mpesaVisible ? "X" : "Cashier(mpesa)"}
            </button>
          </div>
          {mpesaVisible && (
            <Mpesa />
          )}
        </div>
      </div>
      <div className='gc__profile-game-buttons'>
        {visibleGameCard === null ? (
          [20, 50, 100, 200, 300, 500, 1000].map(stake => (
            <div key={stake}>
              <button onClick={() => selectGameCard(stake)}>Game {stake}</button>
            </div>
          ))
        ) : (
          <GameCard user={user} visibleGameCard={visibleGameCard} setVisibleGameCard={setVisibleGameCard} 
          updateStatus={updateStatus} setAmountStake={setAmountStake} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
