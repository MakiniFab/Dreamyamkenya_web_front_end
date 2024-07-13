import { useState, useEffect } from 'react';

import Mpesa from './Mpesa';
import './backendComponents.css';
import GameCard from '../components/GameCard';

const UserProfile = ({ fetchCurrentUser, currentUser, loading, error }) => {
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

  const updateStatus = async (currentUserId, status) => {
    
    try {
      await fetch(`http://localhost:5000/status/${currentUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentUserId, status }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setAmountStake = async (amount) => {
    if (!currentUser || !currentUser.id) {
      console.error("currentUser id not available");
      return;
    }

    try {
      await fetch(`http://localhost:5000/amount/${currentUser.id}`, {
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
    if (!currentUser || !currentUser.id) {
      console.error("currentUser id not available");
      return;
    }
    if (visibleGameCard === stake) {
      setVisibleGameCard(null);
    } else {
      setVisibleGameCard(stake);
      updateStatus(currentUser.id, "online");
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
          ) : currentUser ? (
            <div className='gc__profile-card-details'>
              <p><strong>Username:</strong> {currentUser.username}</p>
              <p><strong>Phone Number:</strong> {currentUser.phone_number}</p>
              <p><strong>Balance:</strong> {currentUser.balance}</p>
            </div>
          ) : (
            <p>No currentUser data available</p>
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
          <GameCard currentUser={currentUser} visibleGameCard={visibleGameCard} setVisibleGameCard={setVisibleGameCard} 
          updateStatus={updateStatus} setAmountStake={setAmountStake} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
