import React from 'react';

function WaitingForOpponentComponent({ haveOpponent }) {

    if (haveOpponent) {
        return (<div></div>)
    } else {
        return (
            <h1 style={{ position: "absolute", top: "35%", left: "35%", color: "white" }}>Waiting for opponent</h1>
        )
    }
}

export default WaitingForOpponentComponent;