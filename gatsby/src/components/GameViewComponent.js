import * as React from "react"
import io from 'socket.io-client';


import ButtonsComponent from "./ButtonsComponent";
import PlayFieldComponent from "./PlayFieldComponent";
import JoinComponent from "./JoinComponent";
import ButtonComponent from "./ButtonComponent";
import StartInComponent from "./StartInComponent";


function GameViewComponent() {
    const [physics, setPhysics] = React.useState(null);
    const [firstPlayerPos, setFirstPlayerPos] = React.useState('0px')
    const [secondPlayerPos, setSecondPlayerPos] = React.useState('0px')
    const [ballLeftPos, setBallLeftPos] = React.useState('0px')
    const [ballTopPos, setBallTopPos] = React.useState('0px')

    const [socket, setSocket] = React.useState(null);

    const [startIn, setStartIn] = React.useState(null)
    const [gameRunning, setGameRunning] = React.useState(false);
    const [firstPlayerScore, setFirstPlayerScore] = React.useState(0);
    const [secondPlayerScore, setSecondPlayerScore] = React.useState(0);
    const [amILeftPlayer, setAmILeftPlayer] = React.useState(null);
    const [haveOpponent, setHaveOpponent] = React.useState(false);


    function joinOnClick() {
        if (socket) {
            console.log("Join")
            socket.emit("join", true);
        }
    }




    React.useEffect(() => {
        const newSocket = io('http://localhost/');

        setSocket(newSocket);

        var movement = "none";
        function newMovement(move) {

            if (movement != move) {
                movement = move;
                newSocket.emit("playerPos", move)
            }
        }

        document.addEventListener("keydown", function (e) {  // simple but powerful
            switch (e.key) {
                case "ArrowDown":
                    console.debug("ArrowDown");
                    newMovement("down");
                    break;
                case "ArrowUp":
                    console.debug("ArrowUp");
                    newMovement("up");
                    break;
                default:
                    return;
            }
        });
        document.addEventListener("keyup", function (e) {
            switch (e.key) {
                case "ArrowDown":
                    console.debug("ArrowDown-keyup");
                    if (movement == "down") {
                        newMovement("none")
                    }
                    break;
                case "ArrowUp":
                    console.debug("ArrowUp-keyup");
                    if (movement == "up") {
                        newMovement("none")
                    }
                    break;
                default:
                    return;
            }
        });

    




        newSocket.on("data", function (data) {
            setPhysics(data.gamePhysicsData)

            setFirstPlayerPos(data.gamePhysicsData.firstPlayerPos)
            setSecondPlayerPos(data.gamePhysicsData.secondPlayerPos)
            setBallLeftPos(data.gamePhysicsData.ballLeftPos)
            setBallTopPos(data.gamePhysicsData.ballTopPos)

            setStartIn(data.gameOtherData.startIn)
            
            
            setFirstPlayerScore(data.gameOtherData.firstPlayerScore)
            setSecondPlayerScore(data.gameOtherData.secondPlayerScore)

            setHaveOpponent(data.gameOtherData.firstPlayerName != null && data.gameOtherData.secondPlayerName != null)


        })

        newSocket.on("join", function (join) {
            if (join != "full") {
                setGameRunning(true);
                setAmILeftPlayer(join == "first")
            } else {
                console.log("Game full!")
                alert("Game full :(")
            }
        });



        return () => {
            if (socket) {
                socket.disconnect();
            }
        };


    }, []);

    return (
        <div>
            <div style={{ display: "flex" }}>
                {gameRunning == false ? (
                    <ButtonComponent text="Join" onClick={joinOnClick}></ButtonComponent>
                ) : (
                    <div>
                        <PlayFieldComponent startIn={startIn} leftPlayerPos={firstPlayerPos} rightPlayerPos={secondPlayerPos} ballLeftPos={ballLeftPos} ballTopPos={ballTopPos} leftScore={firstPlayerScore} rightScore={secondPlayerScore} haveOpponent={haveOpponent}></PlayFieldComponent>

                    </div>
                )}
            </div>
        </div>
    )
}
export default GameViewComponent;