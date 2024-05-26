import { createServer } from "http";
import { Server } from "socket.io";
import calculatePlayerPositionComponent from "./components/calculatePlayerPositionComponent.mjs";
import calculateBallPositionComponent from "./components/calculateBallPositionComponent.mjs";
import physics from "./components/physics.mjs";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

var firstPlayerSocketId = null;
var secondPlayerSocketId = null;

var startIn = 10000; //in ms

const gamePhysicsData = {
  firstPlayerMove: 0,
  secondPlayerMove: 0,
  firstPlayerPos: 0,
  secondPlayerPos: 0,
  ballLeftPos: 480,
  ballTopPos: 230,
  ballLeftMovementSpeed: 0,
  ballTopMovementSpeed: 0,
}

//performing update every 20 miliseconds
setInterval(function () {
  physics(gamePhysicsData);
  if (firstPlayerSocketId != null && secondPlayerSocketId != null) {

    //start countdown when both players are connected
    startIn -= 20;
    if (startIn < 0) {
      startIn = 0;
    }
  }
}, 20)

io.on("connection", (socket) => {

  //called when player press "join"
  socket.on("join", function (_) {
    if (firstPlayerSocketId == null) {
      console.log("First player connected", socket.id)
      firstPlayerSocketId = socket.id;

      socket.emit("join", "first")
    } else if (secondPlayerSocketId == null) {
      console.log("Second player connected", socket.id)
      secondPlayerSocketId = socket.id;

      socket.emit("join", "second")
    } else {

      socket.emit("join", "full")
    }
  })

  //client is sending his desired move
  socket.on("playerPos", function (move) {
    if (firstPlayerSocketId == socket.id) {
      gamePhysicsData.firstPlayerMove = move
    } else if (secondPlayerSocketId == socket.id) {
      gamePhysicsData.secondPlayerMove = move;
    }
  });

  socket.on("disconnect", function () {
    if (firstPlayerSocketId == socket.id) {
      console.log("First player disconnect", socket.id)
      firstPlayerSocketId = null;
    } else if (secondPlayerSocketId == socket.id) {
      console.log("Second player disconnect", socket.id)
      secondPlayerSocketId = null;
    }
  });

  setInterval(function () {
    socket.emit("physics", gamePhysicsData);
    socket.emit("startIn", startIn);
  }, 10)



});

httpServer.listen(4000);