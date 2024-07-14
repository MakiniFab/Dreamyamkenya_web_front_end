// import { useState, useEffect } from 'react';


// import Mpesa from './Mpesa';
// import './backendComponents.css';
// import GameCard from '../components/GameCard';

// const UserProfile = ({ fetchCurrentUser, updateStatus, currentUser, loading, error }) => {
//   const [balance, setBalance] = useState(0)
//   const [mpesaVisible, setMpesaVisible] = useState(false);
//   const [visibleGameCard, setVisibleGameCard] = useState(null);
//   const token = localStorage.getItem('token');
 

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   function showMpesa() {
//     setMpesaVisible(!mpesaVisible);
//   }

  

//   // const updateBalance = async (newBalance) => {
//   //   try {
//   //     await fetch(`http://localhost:5000/balance/${currentUser.id}`, {
//   //       method: 'PATCH',
//   //       headers: {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': `Bearer ${token}`,
//   //           },
//   //       body: JSON.stringify({balance: newBalance})
//   //   })
//   //   fetchCurrentUser()
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //   }
//   // }

//   function selectGameCard(stake) {
//     const newBalance = currentUser.balance - parseFloat(stake)
//     if (!currentUser || !currentUser.id) {
//       console.error("currentUser id not available");
//       return;
//     }
//     if (visibleGameCard === stake) {
//       setVisibleGameCard(null);
//     } else {
//       if (currentUser.balance >= stake) {
//         setVisibleGameCard(stake);
//         updateStatus(currentUser.id, "online");
//         setAmountStake(stake);
//         updateBalance(newBalance)
//       } else {
//         console.log("choose lower amount")
//       }  
//     }
//   }

//   return (
//     <div className='gc__profile-container'>
//       <div className='gc__profile-container-top'>
//         <div className='gc__profile-card'>
//           <h2>Current User Details</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p>Error: {error}</p>
//           ) : currentUser ? (
//             <div className='gc__profile-card-details'>
//               <p><strong>Username:</strong> {currentUser.username}</p>
//               <p><strong>Phone Number:</strong> {currentUser.phone_number}</p>
//               <p><strong>Balance:</strong> {currentUser.balance}</p>
//             </div>
//           ) : (
//             <p>No currentUser data available</p>
//           )}
//         </div>
//         <div className='gc__profile-mpesa'>
//           <div>
//             <button onClick={showMpesa}>
//               {mpesaVisible ? "X" : "Cashier(mpesa)"}
//             </button>
//           </div>
//           {mpesaVisible && (
//             <Mpesa updateBalance={updateBalance} currentUser={currentUser}/>
//           )}
//         </div>
//       </div>
//       <div className='gc__profile-game-buttons'>
//         {visibleGameCard === null ? (
//           [20, 50, 100, 200, 300, 500, 1000].map(stake => (
//             <div key={stake}>
//               <button onClick={() => selectGameCard(stake)}>Game {stake}</button>
//             </div>
//           ))
//         ) : (
//           <GameCard currentUser={currentUser} visibleGameCard={visibleGameCard} setVisibleGameCard={setVisibleGameCard} 
//           updateStatus={updateStatus} setAmountStake={setAmountStake} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
