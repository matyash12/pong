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


        function keyHandler(e) {  // simple but powerful
            switch (e.key) {
                case "ArrowDown":
                    console.debug("ArrowDown");
                    newSocket.emit("playerPos", "down")
                    break;
                case "ArrowUp":
                    console.debug("ArrowUp");
                    newSocket.emit("playerPos", "up")
                    break;
                default:
                    return;
            }
        }

        document.addEventListener("keydown", keyHandler);
       


            newSocket.on("data", function (data) {
                setPhysics(data.gamePhysicsData)

                setFirstPlayerPos(data.gamePhysicsData.firstPlayerPos)
                setSecondPlayerPos(data.gamePhysicsData.secondPlayerPos)
                setBallLeftPos(data.gamePhysicsData.ballLeftPos)
                setBallTopPos(data.gamePhysicsData.ballTopPos)

                setStartIn(data.gameOtherData.startIn)
                setFirstPlayerScore(data.gameOtherData.firstPlayerScore)
                setSecondPlayerScore(data.gameOtherData.secondPlayerScore)
                //setHaveOpponent(true);

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