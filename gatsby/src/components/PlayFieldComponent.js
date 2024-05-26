import React from 'react';
import StartInComponent from "./StartInComponent";
import WaitingForOpponentComponent from './waitingForOpponentComponent';

function PlayFieldComponent({ leftPlayerPos, rightPlayerPos, ballLeftPos, ballTopPos, startIn, leftScore, rightScore, haveOpponent }) {

    return <div style={{ backgroundColor: 'black', width: '1000px', height: '500px', position: 'relative' }}>


        <div>
            <div style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                background: 'repeating-linear-gradient(rgb(240, 240, 240), rgb(240, 240, 240) 15px, black 10px, black 40px)',
                height: '100%', width: '2px'
            }}></div>


        </div>


        <div style={{ backgroundColor: 'white', width: '15px', height: '100px', position: 'absolute', left: '35px', top: leftPlayerPos }}></div>
        <div style={{ backgroundColor: 'white', width: '15px', height: '100px', position: 'absolute', right: '35px', top: rightPlayerPos }}></div>
        <div style={{ backgroundColor: 'white', width: '20px', height: '20px', position: 'absolute', left: ballLeftPos, top: ballTopPos }}></div>

        <div>
            <StartInComponent startIn={startIn}></StartInComponent>
            <h1 style={{ position: "absolute", top: "0%", left: "30%", color: "white" }}>{leftScore}</h1>
            <h1 style={{ position: "absolute", top: "0%", left: "70%", color: "white" }}>{rightScore}</h1>
            <WaitingForOpponentComponent haveOpponent={haveOpponent}></WaitingForOpponentComponent>
        </div>
    </div>
};

export default PlayFieldComponent;
