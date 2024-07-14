import { useState, useEffect } from 'react';

import Mpesa from './Mpesa';
import './backendComponents.css';
import GameCard from '../components/GameCard';

const UserProfile = ({ fetchCurrentUser, updateStatus, updateBalance, updateAmount,  currentUser, loading, error }) => {
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

  function selectGameCard(stake) {
    if (visibleGameCard === stake) {
      setVisibleGameCard(null);
    } else {
      setVisibleGameCard(stake);
      updateStatus(currentUser.id, "online"); 
    }
  }

  return (
    <div className='gc__profile-container'>
      <div className='gc__profile-container-top'>
        <div className='gc__profile-card'>
          <h2>My profile</h2>
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
            <Mpesa  updateBalance={updateBalance} currentUser={currentUser}/>
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
          updateStatus={updateStatus} updateBalance={updateBalance} stake={stake} updateAmount={updateAmount} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
