// console.log("hello there");
const socket=io('http://localhost:3000/');//this connects with the server. Function without link(default) try to connect with host.

socket.emit('message');
socket.on('Good',(name)=>console.log(name));