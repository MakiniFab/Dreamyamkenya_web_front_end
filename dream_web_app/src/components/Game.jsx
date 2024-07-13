import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Game({currentUser, updateStatus}) {
    const location = useLocation();
    const pairedUser = location.state ?.pairedUser;
    const [firstClicker, setFirstClicker] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => {
      if (loading || firstClicker) return;
      setLoading(true)

      updateStatus(currentUser.id, "firstClicker")
      updateStatus(pairedUser.id, "lastClicker")

      setFirstClicker(currentUser)
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
    </div>
  )
}

export default Game;