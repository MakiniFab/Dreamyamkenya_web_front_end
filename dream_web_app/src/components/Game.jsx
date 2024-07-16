import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Game({currentUser, fetchCurrentUser, updateStatus, updateBalance}) {
    const navigate = useNavigate();
    const location = useLocation();
    const pairedUser = location.state.pairedUser;
    const [clickedBy, setClickedBy] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
      fetchCurrentUser();
    }, []);

    function handleClick(userId) {
      if (!clickedBy) {
        setClickedBy(userId)
        setButtonDisabled(true)

        const winStatus = userId === currentUser.id ? 1 : 0;
        updateWins(userId, winStatus)
      }
    }

    const updateWins = async (userId, winStatus) => {
      const token = localStorage.getItem('token')
      try {
        await fetch(`http://localhost:5000/wins/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ wins: winStatus }),
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useEffect(() => {
      if (clickedBy) (
        console.log(`User ${clickedBy} clicked first`)
      )
    }, [clickedBy])

    return (
      <div>
        <h2>Game</h2>
        {clickedBy ? (
          <p>{clickedBy === currentUser.id ? "you clicked first" : `${pairedUser.username} clicked first`}</p>
        ) : (
          <div>
            <button onClick={() => handleClick(currentUser.id)} disabled={buttonDisabled} >click me</button>
          </div>
        )}
      </div>
    )
}

export default Game;