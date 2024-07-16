import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Game({currentUser, fetchCurrentUser}) {
    const location = useLocation();
    const navigate = useNavigate();
    const pairedUser = location.state ?.pairedUser;
    const [firstClicker, setFirstClicker] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
      fetchCurrentUser();
    }, []);

    //function to update wins of a user
  const updateWins = async (currentUserId, wins) => {
    try {
      await fetch(`http://localhost:5000/wins/${currentUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentUserId, wins }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
    const handleClick = () => {
      if (loading || firstClicker) return;
      setLoading(true)

      setFirstClicker(currentUser)
      updateWins(currentUser.id, "1o1")
      updateWins(pairedUser.id, "0o1")
      navigate('/profile')
      setLoading(false)
    }

  return (
    <div>
      <div>
        <h2>CaptaiN</h2>
        <p>paired with: {pairedUser.username}</p>
        <button onClick={handleClick}  disabled={!!firstClicker || loading}>
          {firstClicker ? `First clicker: $ {firstClicker.username}` :
           'Click me'}
        </button>
      </div>
      <div>
        <p>{currentUser.username}</p>
        <p>{currentUser.balance}</p>
        <p>{currentUser.wins}</p>
        <p>{currentUser.status}</p>
        <p>{currentUser.amount}</p>
      </div>
    </div>
  )
}

export default Game;