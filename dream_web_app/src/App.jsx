import { useState} from 'react';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import UserProfile from './backendComponents/UserProfile';
import HomeBody from "./components/HomeBody";
import Game from './components/Game';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchCurrentUser = () => {
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
      .then(currentUser => {
        setCurrentUser(currentUser);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };
  
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


  return (
      <div>
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route 
            path="/profile" 
            element={<UserProfile currentUser={currentUser} loading={loading} fetchCurrentUser={fetchCurrentUser}
            updateStatus={updateStatus} error={error} />} 
          />
          <Route path="/game" element={<Game currentUser={currentUser} updateStatus={updateStatus} />} />
        </Routes>
      </div>
  );
}

export default App;