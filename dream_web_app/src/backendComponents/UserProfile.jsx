import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mpesa from './Mpesa';
import './backendComponents.css'
import GameCard from '../components/GameCard';

const UserProfile = ({fetchCurrentUser, user, setUser, loading, setLoading}) => {
  const [mpesaVisible, setMpesaVisible] = useState(false)
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);


  function showMpesa() {
    setMpesaVisible(!mpesaVisible)
  }

  return (
    <div className='gc__profile-container' >
      <div className='gc__profile-card' >
        <h2>Current User Details</h2>
        {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className='gc__profile-card-details' >
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Phone Number:</strong> {user.phone_number}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <p><strong>Wins:</strong> {user.wins}</p>
              <p><strong>Balance:</strong> {user.balance}</p>
            </div>
          ) : (
            <p>No user data available</p>
        )}
      </div>
      <div className='gc__profile-mpesa' >
        <div>
          <button onClick={showMpesa} >
            {mpesaVisible ? "X" : "Cashier(mpesa)"}
          </button>
        </div>
        {mpesaVisible && (
          <Mpesa />
        )}
      </div>
      <div className='gc__profile-game-buttons' >
        <button>Game 1</button>
        <button>Game 2</button>
        <button>Game 3</button>
        <button>Game 4</button>
      </div>
      <div  >
        <GameCard />
      </div>
    </div>
  );
};

export default UserProfile;



