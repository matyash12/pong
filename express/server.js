import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

const playerMovementSpeed = 100;

const minPlayerBarrier = 0;
const maxPlayerBarrier = 400;

var leftPlayerMove = null;
var leftPlayerPos = 0;

var rightPlayerMove = null;
var rightPlayerPos = 0;

//performing physicics update every 20 miliseconds
setInterval(function(){
  if (leftPlayerMove == "up"){
    leftPlayerPos -= playerMovementSpeed * 0.02;
    if (minPlayerBarrier > leftPlayerPos){
      leftPlayerPos = minPlayerBarrier;
    }
  }
  if (leftPlayerMove == "down"){
    leftPlayerPos += playerMovementSpeed * 0.02;
    if (maxPlayerBarrier < leftPlayerPos){
      leftPlayerPos = maxPlayerBarrier;
    }
  }
}, 20)

io.on("connection", (socket) => {
    socket.on("leftPlayerPos", function(move){
      console.log("new leftPlayerPos movement")
      leftPlayerMove = move
    });

    setInterval(function(){
      socket.emit("leftPlayerPos",leftPlayerPos);

    }, 10)
});

httpServer.listen(4000);