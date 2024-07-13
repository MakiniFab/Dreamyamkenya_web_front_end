import { useState, useEffect } from 'react';

function Mpesa({currentUser, fetchCurrentUser}) {
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState('');
    const token = localStorage.getItem('token');

    const handleDeposit = () => {
        const newBalance = currentUser.balance + parseFloat(amount)
        updateBalance(newBalance)
    }

    const handleWithdraw = () => {
        const newBalance = currentUser.balance - parseFloat(amount)
        updateBalance(newBalance)
    }

    const updateBalance =(newBalance) => {
        fetch(`http://localhost:5000/balance/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
                },
            body: JSON.stringify({balance: newBalance})
        })
        .then(response => response.json())
        .then(data => {
            setBalance(data.balance)
            setAmount('')
        })
        .catch(error => {
            console.error("error fetchong balance")
        })
    }

    return (
        <div>
            <div>
                <p>Current Balance: </p>
                <p>{currentUser.balance}</p>
            </div>
            <div>
                <input type='number' name='amount' value={amount} 
                onChange={(e) => setAmount(e.target.value)} placeholder='Enter amount' required />
                <button onClick={handleDeposit} >Deposit</button>
            </div>
            <div>
            <input type='number' name='amount' value={amount} 
                onChange={(e) => setAmount(e.target.value)} placeholder='Enter amount' required />
                <button onClick={handleWithdraw} >Withdraw</button>
            </div>
        </div>
    );
}

export default Mpesa;
