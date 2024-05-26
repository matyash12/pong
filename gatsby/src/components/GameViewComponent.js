import * as React from "react"
import io from 'socket.io-client';


import ButtonsComponent from "./ButtonsComponent";
import PlayFieldComponent from "./PlayFieldComponent";
import JoinComponent from "./JoinComponent";
import ButtonComponent from "./ButtonComponent";
import StartInComponent from "./StartInComponent";


function GameViewComponent() {
    const [firstPlayerPos, setFirstPlayerPos] = React.useState('0px')
    const [secondPlayerPos, setSecondPlayerPos] = React.useState('0px')
    const [ballLeftPos, setBallLeftPos] = React.useState('0px')
    const [ballTopPos, setBallTopPos] = React.useState('0px')
    const [socket, setSocket] = React.useState(null);
    const [startIn, setStartIn] = React.useState(null)
    const [physics, setPhysics] = React.useState(null);
    const [gameRunning, setGameRunning] = React.useState(false);

    function upOnClick() {
        if (socket) {
            console.log("Up")
            socket.emit("playerPos", "up")
        }

    }
    function downOnClick() {
        if (socket) {
            console.log("Down")
            socket.emit("playerPos", "down")
        }

    }
    function joinOnClick() {
        if (socket) {
            console.log("Join")
            socket.emit("join", true);
        }
    }

    React.useEffect(() => {
        const newSocket = io('http://localhost/');
        setSocket(newSocket);


        newSocket.on("physics", function (physics) {
            setPhysics(physics)
            setFirstPlayerPos(physics.firstPlayerPos)
            setSecondPlayerPos(physics.secondPlayerPos)
            setBallLeftPos(physics.ballLeftPos)
            setBallTopPos(physics.ballTopPos)
        })

        newSocket.on("startIn", function (_startIn) {
            setStartIn(_startIn)
        })

        newSocket.on("join", function (join) {
            if (join != "full") {
                setGameRunning(true);
            } else {
                console.log("Game full!")
                alert("Game full :(")
            }
        });


        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <div style={{ display: "flex" }}>
                {gameRunning == false ? (
                    <ButtonComponent text="Join" onClick={joinOnClick}></ButtonComponent>
                ) : (
                    <div>
                        <PlayFieldComponent startIn={startIn} leftPlayerPos={firstPlayerPos} rightPlayerPos={secondPlayerPos} ballLeftPos={ballLeftPos} ballTopPos={ballTopPos}></PlayFieldComponent>
                        <ButtonsComponent downOnClick={downOnClick} upOnClick={upOnClick}></ButtonsComponent>
                    </div>
                )}
            </div>
        </div>
    )
}
export default GameViewComponent;