import { useState, useEffect } from 'react';

function Mpesa() {

    return (
        <div>
            <div>
                <p>Current Balance: </p>
            </div>
            <div>
                <input type='number' name='amount' placeholder='Enter amount' required />
                <button>Deposit</button>
            </div>
            <div>
                <input type='number' name='amount' placeholder='Enter amount' required />
                <button>Withdraw</button>
            </div>
        </div>
    );
}

export default Mpesa;
