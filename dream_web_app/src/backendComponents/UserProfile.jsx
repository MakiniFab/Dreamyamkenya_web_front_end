import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mpesa from './Mpesa';
import './backendComponents.css';
import GameCard from '../components/GameCard';

const UserProfile = ({ fetchCurrentUser, updateBalance, updateStatus, currentUser, loading, error }) => {
  const [mpesaVisible, setMpesaVisible] = useState(false);
  const [visiblegameCard, setVisibleGameCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser.wins === "0o0") {
      setVisibleGameCard(null)
    } else if (currentUser.wins === "0o1" || currentUser.wins === "1o1"){
      setVisibleGameCard(currentUser.amount)
      updateStatus(currentUser.id, "online")
      updateAmount(currentUser.id, stake)
    }
  }, [currentUser])

  const updateAmount = async (currentUserId, amount) => {
    try {
      await fetch(`http://localhost:5000/amount/${currentUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentUserId, amount }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function showMpesa() {
    setMpesaVisible(!mpesaVisible);
  }

  function selectGameCard(stake) {
    if (visiblegameCard === stake) {
      setVisibleGameCard(null)
    } else {
      setVisibleGameCard(stake)
      updateStatus(currentUser.id, "online")
      updateAmount(currentUser.id, stake)
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
              <p><strong>Wins:</strong> {currentUser.wins}</p>
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
        <div>
          {visiblegameCard === null ? (
            [20,50,100,200,300,500,1000].map(stake => (
              <div key={stake}>
                <button onClick={() => selectGameCard(stake)} >Game card</button>
              </div>
            ))
          ) : 
          (
            <GameCard currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}  
            updateStatus={updateStatus} updateBalance={updateBalance} updateAmount={updateAmount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
