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
var socket = null;

const gamePhysicsData = {
  firstPlayerMove: 0,
  secondPlayerMove: 0,
  firstPlayerPos: 0,
  secondPlayerPos: 0,
  ballLeftPos: 490,
  ballTopPos: 240,
  ballLeftMovementSpeed: 0,
  ballTopMovementSpeed: 0,
  collision: false,
}

const gameOtherData = {
  firstPlayerName: null,
  secondPlayerName: null,
  firstPlayerScore: 0,
  secondPlayerScore: 0,
  startIn: 5000,
  firstPlayerLastMoveCommand: null,
  secondPlayerLastMoveCommand: null,
}

const data = {
  gamePhysicsData: gamePhysicsData,
  gameOtherData: gameOtherData,
}

function restartPhysics() {
  console.info("restartPhysics");
  gamePhysicsData.ballLeftPos = 490;
  gamePhysicsData.ballTopPos = 240;
  gamePhysicsData.ballLeftMovementSpeed = 0;
  gamePhysicsData.ballTopMovementSpeed = 0;
}

function restartGame() {
  console.info("restartGame");

  restartPhysics();
  gameOtherData.startIn = 3000;
}

//performing update every 20 miliseconds
setInterval(function () {

  gamePhysicsData.collision = false;
  physics(gamePhysicsData,
    function onBallRightSideHit() {
      console.info("onBallRightSideHit");
      gameOtherData.firstPlayerScore += 1;
      restartGame();
    },
    function onBallLeftSideHit() {
      console.info("onBallLeftSideHit");
      gameOtherData.secondPlayerScore += 1;
      restartGame();
    },
    function onCollision() {
      console.info("onCollision");
      gamePhysicsData.collision = true;
    });

  //if game isnt suppose to run
  if (gameOtherData.startIn > 0) {
    gamePhysicsData.ballLeftPos = 490;
    gamePhysicsData.ballTopPos = 240;
    gamePhysicsData.ballLeftMovementSpeed = 0;
    gamePhysicsData.ballTopMovementSpeed = 0;
  }

  if (gamePhysicsData.ballLeftMovementSpeed == 0 && data.gameOtherData.startIn <= 0) {

    if (Math.random() > 0.5) {
      gamePhysicsData.ballLeftMovementSpeed = 5
    } else {
      gamePhysicsData.ballLeftMovementSpeed = -5
    }
  }


  //Countdown
  if (firstPlayerSocketId != null && secondPlayerSocketId != null) {
    //start countdown when both players are connected
    gameOtherData.startIn -= 20;
    if (gameOtherData.startIn < 0) {
      gameOtherData.startIn = 0;
    }
  }
}, 20)

io.on("connection", (socket) => {

  //called when player press "join"
  socket.on("join", function (_) {
    if (firstPlayerSocketId == null) {
      console.log("First player connected", socket.id)
      firstPlayerSocketId = socket.id;
      gameOtherData.firstPlayerName = socket.id;
      socket.emit("join", "first")
    } else if (secondPlayerSocketId == null) {
      console.log("Second player connected", socket.id)
      secondPlayerSocketId = socket.id;
      gameOtherData.secondPlayerName = socket.id;
      socket.emit("join", "second")
    } else {

      socket.emit("join", "full")
    }
  })

  //client is sending his desired move
  socket.on("playerPos", function (move) {
    if (firstPlayerSocketId == socket.id) {
      gamePhysicsData.firstPlayerMove = move
      gameOtherData.firstPlayerLastMoveCommand = new Date().getTime();
    } else if (secondPlayerSocketId == socket.id) {
      gamePhysicsData.secondPlayerMove = move;
      gameOtherData.secondPlayerLastMoveCommand = new Date().getTime();
    }
  });

  socket.on("disconnect", function () {
    if (firstPlayerSocketId == socket.id) {
      console.log("First player disconnect", socket.id)
      gameOtherData.firstPlayerName = null;
      firstPlayerSocketId = null;
    } else if (secondPlayerSocketId == socket.id) {
      console.log("Second player disconnect", socket.id)
      gameOtherData.secondPlayerName = null;
      secondPlayerSocketId = null;
    }
  });

  setInterval(function () {
    socket.emit("physics", gamePhysicsData);
    socket.emit("data", data)
  }, 10)



});

httpServer.listen(4000);