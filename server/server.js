const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
let message = [];
let index = 0;

io.on("connection", socket => {
 
    socket.on('newuser', username => {
        console.log(`${username} has arrived at the party.`);
        socket.username = username;
        users.push(socket);
    });
  
 //Disconnect
  socket.on("disconnect", () => {
      console.log(`${socket.username} has left the party.`)
  });
});
http.listen(process.env.PORT || 3000, () => { console.log("Listening on port %s", process.env.PORT || 3000);});




