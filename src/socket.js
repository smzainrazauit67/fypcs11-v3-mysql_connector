import { io } from "socket.io-client";

const serverURl = "http://172.104.174.187:4130";
// const serverURl = "http://localhost:4130";
const socket = io(serverURl);

//Event emitters.

export const emitWatch = (data) => {
  socket.emit('watch-logs')
}

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
    console.log("listened: ", d)
    if (d) {
      lines(oldArr => [...oldArr, d])
    }

  })
}

//For live streaming
export const listenerWatch = (watches) => {
  socket.on("watch-logs",(d) => {
    console.log("watched my-sql logs");
    console.log("watched: ", d);
    if (d) {
      watches(oldArr => [...oldArr, d])
    }
  })
}

