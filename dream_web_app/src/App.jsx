import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserProfile from './backendComponents/UserProfile';
import HomeBody from "./components/HomeBody";
import GameCard from './components/GameCard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      setError('Invalid token');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('http://127.0.0.1:5000/current_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
      <div>
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route 
            path="/profile" 
            element={<UserProfile user={user} loading={loading} fetchCurrentUser={fetchCurrentUser} error={error} />} 
          />
          <Route path="/gameCard" element={<GameCard/>} />
        </Routes>
      </div>
  );
}

export default App;