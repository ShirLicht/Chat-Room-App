const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {
 
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    });
    socket.on('newuser', username => {
        console.log(`${username} has arrived at the party.`);
        socket.username = username;
        users.push(socket);

        //pass back a username - so everyone will know there is a new user that is online
        io.emit('userOnilne', socket.username);
    });
  
    //Get new message
    socket.on('msg', msg => {
        let message = {
            index : index,
            username: socket.username,
            msg: msg
        }

        messages.push(message);

        io.emit('msg', message);

        index++;
    });

 //Disconnect
  socket.on("disconnect", () => {
      console.log(`${socket.username} has left the party.`)

      //notify all the users that the user with the socket.username left the chat
      io.emit('userLeft', socket.username);
      //check what is the sockets index and remove it from the users array
      users.splice(users.indexOf(socket), 1);
  });
});

http.listen(process.env.PORT || 3000, () => { console.log("Listening on port %s", process.env.PORT || 3000);});




