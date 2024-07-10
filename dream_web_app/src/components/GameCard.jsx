
function GameCard(props) {
    const {stake} = props

    return (
        <div className="gc__gamecard-container" >
            <div className="gc__gamecard-title" >
                <h2>Game amount{stake}</h2>
                <div className="gc__gamecard-list" >
                    <p>Searchh for friend?</p>
                    <p>Waiting list</p>
                    <p>Waiting list</p>
                    <p>Waiting list</p>
                    <p>Waiting list</p>
                </div>
            </div>
            {/* if no player remain pairing. if opponent.. pair then auto redirect to game */}
            <p>Pairing with opponent...</p><br />
            <button >Pay</button>
        </div>
    );
}

export default GameCard;