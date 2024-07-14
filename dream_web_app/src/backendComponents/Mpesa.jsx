import { useState } from 'react';

function Mpesa({currentUser, updateBalance}) {
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        const newBalance = currentUser.balance + parseFloat(amount)
        updateBalance(currentUser.id, newBalance)
        setAmount('')
    }

    const handleWithdraw = () => {
        if (currentUser.balance >= amount) {
            const newBalance = currentUser.balance - parseFloat(amount)
        updateBalance(currentUser.id, newBalance)
        setAmount('')
        } else {
            console.log("withdraw less")
        } 
    }

    return (
        <div>
            <div>
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
