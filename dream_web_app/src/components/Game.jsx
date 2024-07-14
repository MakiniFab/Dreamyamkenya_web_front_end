import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Game({currentUser, fetchCurrentUser, updateWins}) {
    const location = useLocation();
    const navigate = useNavigate();
    const pairedUser = location.state ?.pairedUser;
    const [firstClicker, setFirstClicker] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => {
      if (loading || firstClicker) return;
      setLoading(true)

      updateWins(currentUser.id, "0o0")
      updateWins(pairedUser.id, "0o0")
      setFirstClicker(currentUser)
      setLoading(false)
      fetchCurrentUser();
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