const socketMain = (io) => {
  io.on("connection", (socket) => {
    console.log(`Someone has connected on worker ${process.pid}`);
    socket.emit("client-connected", `Welcome from ${process.pid} socket.io server!!`);
  });
}

module.exports = socketMain;