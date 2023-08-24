import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

socket.on("connect", () => {
  console.log("This client has been connected!");
});

socket.on("client-connected", (message) => {
  console.log(message);
});