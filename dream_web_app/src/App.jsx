import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './backendComponents/UserProfile';
import HomeBody from "./components/HomeBody";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function fetchCurrentUser() {
    const token = localStorage.getItem('token')
    fetch('http://127.0.0.1:5000/current_user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((response) => response.json())
      .then((user) => setUser(user))
      .then((loading) => setLoading(loading));

  }
   
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeBody />} />
                <Route path="/profile" element={<UserProfile user={user} loading={loading} fetchCurrentUser={fetchCurrentUser} />} />
            </Routes>
        </div>
    );
}

export default App;
