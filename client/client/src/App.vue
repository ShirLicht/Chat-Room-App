<template>
  <div id="app">
      <div class="header">
            <h1>Chat Room</h1>
            <p class="username">Username: {{username}}</p>
            <p class="online">Online Users: {{users.length+1}}</p>
      </div>
      <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
  </div>
</template>

<script>
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';

export default {
  name: 'app',
  components: {
    ChatRoom
  },
  data: function(){
    return{
       username:"",
       //connect to the server
       socket: io("http://localhost:3000"),
       messages: [],
       users: []
    }
  },
  methods:{
    joinServer: function (){
      this.socket.on("loggedIn", data => {
        this.messages = data.messages;
        this.users = data.users;
        //pass back the new user name to the server
        this.socket.emit('newuser', this.username);
      });

      this.listen();
  },
  listen: function () {

    
    this.socket.on('userOnline', user => {
      this.users.push(user);
    });

    this.socket.on('userLeft', user => {
      this.users.splice(this.users.indexOf(user), 1);
    });

    this.socket.on('msg', message => {
      this.messages.push(message);
    });
  },
  sendMessage: function (message) { 
    //pass a message back to the server
    this.socket.emit('msg', message);
  }

  },
  mounted: function () {
    this.username = prompt("Hello! :) please enter your username:","Anonymous");

    if(!this.username){
      this.username = "Anonymous";
    }

    this.joinServer();
  }
}
</script>

<style lang="scss">
body{
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  color: #2C3E50;
  margin: 0;
  padding: 0;
}
#app {
  display:flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  //tablet size
  max-width: 768px;
  margin: 0 auto;
  padding: 15px;
  text-align: center;

}
</style>
