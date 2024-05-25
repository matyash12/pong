import * as React from "react"
import io from 'socket.io-client';


import ButtonsComponent from "./ButtonsComponent";
import PlayFieldComponent from "./PlayFieldComponent";
import JoinComponent from "./JoinComponent";
import ButtonComponent from "./ButtonComponent";


function GameViewComponent() {
    const [leftPlayerPos, setLeftPlayerPos] = React.useState('0px')
    const [rightPlayerPos, setRightPlayerPos] = React.useState('0px')
    const [socket, setSocket] = React.useState(null);
    const [gameRunning, setGameRunning] = React.useState(false);

    function upOnClick() {
        if (socket) {
            console.log("Up")
            socket.emit("leftPlayerPos", "up")
        }

    }
    function downOnClick() {
        if (socket) {
            console.log("Down")
            socket.emit("leftPlayerPos", "down")
        }

    }
    function joinOnClick(){
        if (socket){
            console.log("Join")
            socket.emit("join",true);
        }
    }

    React.useEffect(() => {
        const newSocket = io('http://localhost/');
        setSocket(newSocket);

        newSocket.on("leftPlayerPos", function (position) {
            setLeftPlayerPos(position)
        })

        newSocket.on("rightPlayerPos", function (position) {
            setRightPlayerPos(position)
        })
        newSocket.on("join", function(join){
            if (join != "full"){
                setGameRunning(true);
            }else{
                console.log("Game full!")
                alert("Game full :(")
            }
        });


        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div style={{ display: "flex" }}>
            {gameRunning == false ? (
            <ButtonComponent text="Join" onClick={joinOnClick}></ButtonComponent>
            ) : (
            <div>
                <PlayFieldComponent leftPlayerPos={leftPlayerPos} rightPlayerPos={rightPlayerPos}></PlayFieldComponent>
                <ButtonsComponent downOnClick={downOnClick} upOnClick={upOnClick}></ButtonsComponent>
            </div>
            )}
        </div>
    )
}
export default GameViewComponent;