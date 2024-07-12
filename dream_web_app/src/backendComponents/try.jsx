// import { useState, useEffect } from 'react';
// import './components.css';

// function GameCard({ stake, visibleGameCard, setVisibleGameCard, updateStatus, setAmountStake, currentUser }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAllUsers = () => {
//     const token = localStorage.getItem('token');
//     if (!token || token.split('.').length !== 3) {
//       setError('Invalid token');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     fetch('http://localhost:5000/users', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           throw new Error(data.error);
//         }

//         const onlineUsers = Array.isArray(data.users)
//           ? data.users.filter((user) => user.status === 'online')
//           : [];

//         setUsers(onlineUsers);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   // const findMatch = () => {
//   //   const match = users.find((u) => u.id !== user.id && u.amount === user.amount)
//   //   if (match) {
//   //     console.log("match found")
//   //   } else {
//   //     console.log("match not found")
//   //   }
//   //   console.log(user)
//   // }

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);
  
//   function combinedDuty() {
//     setVisibleGameCard(null);
//     updateStatus("offline");
//     setAmountStake(0); 
//   }

//   return (
//     <div className='gc__gameCard-container'>
//       <div className='gc__gameCard-loadingStatue'>
//         <button onClick={combinedDuty}>Back</button>
//         <h2>Game amount {stake}</h2>
//         <p>Pairing with opponent...</p>
//         <br />
//       </div>
//       <div className='gc__gameCard-waitingList'>
//         <p>Search for a friend?</p>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : users.length > 0 ? (
//           <ul>
//             {users.map((user) => (
//               <li key={user.id}>
//                 {user.username || 'No username'} - Stake: {user.amount || 'Not specified'}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users available</p>
//         )}
//       </div>
//       <div>
//         <button  onClick={findMatch} >match</button>
//       </div>
//     </div>
//   );
// }

// export default GameCard;
