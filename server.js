const express = require("express");
//we need to require http, cause socket and express otherwise can't be made listened to the same PORT
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    //broadcase helps to send message to everyone other than the sender
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/FrontEnd/index.html");
});

app.use(express.static(__dirname + "/FrontEnd"));

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
