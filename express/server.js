import { createServer } from "http";
import { Server } from "socket.io";
import calculatePlayerPositionComponent from "./components/calculatePlayerPositionComponent.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

var firstPlayerSocketId = null;
var secondPlayerSocketId = null;

var firstPlayerMove = null;
var secondPlayerMove = null;

var firstPlayerPos = 0;
var secondPlayerPos = 0;

//performing physics update every 20 miliseconds
setInterval(function () {
  firstPlayerPos = calculatePlayerPositionComponent(firstPlayerPos, firstPlayerMove);
  secondPlayerPos = calculatePlayerPositionComponent(secondPlayerPos, secondPlayerMove)
}, 20)

io.on("connection", (socket) => {

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


  socket.on("leftPlayerPos", function (move) {
    if (firstPlayerSocketId == socket.id) {
      console.log("new leftPlayerPos movement")
      firstPlayerMove = move
    } else if (secondPlayerSocketId == socket.id) {
      secondPlayerMove = move;
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
    if (firstPlayerSocketId == socket.id) {
      socket.emit("leftPlayerPos", firstPlayerPos);
      socket.emit("rightPlayerPos", secondPlayerPos);
    } else if (secondPlayerSocketId == socket.id) {
      socket.emit("leftPlayerPos", secondPlayerPos);
      socket.emit("rightPlayerPos", firstPlayerPos);
    }
  }, 10)
});

httpServer.listen(4000);