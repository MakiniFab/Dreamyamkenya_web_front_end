import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mpesa from './Mpesa';
import './backendComponents.css';
import GameCard from '../components/GameCard';

const UserProfile = ({ fetchCurrentUser, user, loading, error }) => {
  const [mpesaVisible, setMpesaVisible] = useState(false);
  const [gameCardVisible, setGameCardVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  function showMpesa() {
    setMpesaVisible(!mpesaVisible);
  }

  function selectGameCard() {
    setGameCardVisible(!gameCardVisible)
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
        <div>
          {gameCardVisible ? <GameCard selectGameCard={selectGameCard} stake={50} /> :
           <button onClick={selectGameCard} >game 50</button>}
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;