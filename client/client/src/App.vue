<template>
  <div id="app">
      <div class="header">
            <h1>Chat Room</h1>
            <p class="username">Username: {{username}}</p>
            <p class="online">Online Users: {{users.length}}</p>
            
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  components: {
  },
  data: function(){
    return{
       username:"",
       //connect to the server
       socket: io("http://localhost:3000"),
       messages: [],
       users: []
    }
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

}
</style>
