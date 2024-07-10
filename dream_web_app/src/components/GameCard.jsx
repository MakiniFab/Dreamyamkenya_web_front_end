import './components.css'

function GameCard({stake, selectGameCard}) {

    return (
        <div className='gc__gameCard-container' >
            <div className='gc__gameCard-loadingStatue'>
                <h2>Game amount {stake}</h2>
                <p>Pairing with opponent...</p><br />
                <button onClick={selectGameCard}>Pay</button>
            </div>
            <div className='gc__gameCard-waitingList' >
                <p>Searchh for friend?</p>
                <p>Waiting list</p>
                <p>Waiting list</p>
                <p>Waiting list</p>
                <p>Waiting list</p>
            </div>
        </div>          
    );
}

export default GameCard;