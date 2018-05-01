<template>
<div>
  <h1> Chat</h1>
	<ul class="messages" v-chat-scroll>
  <li class="message" v-for="message in messages">{{message.username}} : {{ message.message }}</li>
  </ul>
  <input v-model="input_message">
  <button v-on:click="sendMessage(input_message)">Send</button> 
</div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket'
import {joinInGroupChatUrl} from '../utils/requests'
import {mapGetters} from 'vuex'


export default {

  name: 'GroupChat',
  props: [
    'group',
  ],
  data () {
    return {
      rws : null,
      messages: [],
      input_message: "",
    }
  },
  methods:{      
      sendMessage: function(message){
        if (this.rws !== null){
          this.rws.send(JSON.stringify({
            'message': message,
            'username': this.user.username,
          }));
        }
      },
      testFfunc: function(data){
        console.log(data);
      }

  },
  mounted: function(){
     let url = joinInGroupChatUrl(this.group);
     this.rws = new ReconnectingWebSocket(url, undefined, {maxRetries: 3});
     var messages = [];
     this.rws.addEventListener('message', function(event){
       var data = JSON.parse(event.data);
        console.log(data);
        messages.push(data);
     })
     this.messages = messages;
    //  this.rws.onmessage = function(message){
    //     var data = JSON.parse(message.data);
    //     console.log(data);
    //     console.log(this.messages);
    //     this.messages.push(data);
    //   }
  },
  computed: {
    ...mapGetters({
      user: 'user/getLocalUser',
    })
  }
}
</script>

<style lang="css" scoped>
</style>
