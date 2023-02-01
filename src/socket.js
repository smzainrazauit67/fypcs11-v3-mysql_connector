import { io } from "socket.io-client";

const serverURl = "http://172.104.174.187:4130";
// const serverURl = "http://localhost:4130";
const socket = io(serverURl);

//Event emitters.

export const emitData = (data) => {
    console.log('mysql-logs event triggered!')
  socket.emit("mysql-logs", data);
};

//Event listeners.

export const listenerData = (lines) => {
  socket.on("mysql-logs",(d) => {
    // const {lineData} = d;
    console.log('listened mysql-logs event');
    // console.log(d)
    // const myDiv = document.getElementById("data").innerHTML
    lines(oldArr => [...oldArr, d])

  })
}

