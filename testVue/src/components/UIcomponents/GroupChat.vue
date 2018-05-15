<template>
<div>
  <h1> Chat</h1>
	<ul class="messages" v-chat-scroll>
  <li class="message" v-for="message in messages"> At time: {{message.created_time}} <br> {{message.username}} said : {{ message.message }}</li>
  </ul>
  <button v-on:click="loadHistoryMessage()">Load History Message</button>
  <input v-model="input_message">
  <button v-on:click="sendMessage(input_message)">Send</button> 
</div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket'
import {joinInGroupChatUrl} from '@/utils/requests'
import {mapGetters} from 'vuex'
import vue from 'vue'
import store from '@/store'

export default {

  name: 'GroupChat',
  props: [
    'group',
  ],
  data () {
    return {
      rws : null,
      // messages: [],
      input_message: "",
      test_message: null,
    }
  },
  methods:{      
      sendMessage: function(message){
        var m = {}
        m['message'] = message;
        m['username'] = this.user.username;
        if (this.rws !== null){
          this.rws.send(JSON.stringify(m));
          // this.$store.dispatch('message/addMessage', m);
        }
      },
      loadHistoryMessage: function(){
        var payload = {}
        payload['travel_group'] = this.group;
        this.$store.dispatch('message/loadHistoryMessage', payload);
      }

  },
  mounted: function(){
     let url = joinInGroupChatUrl(this.group);
     this.rws = new ReconnectingWebSocket(url, undefined, {maxRetries: 3});
     let vm = this;
     this.rws.addEventListener('message', function(event){
       var data = JSON.parse(event.data);
        console.log(data);
        // if(data.username !== vm.user.username){
          vm.$store.dispatch('message/addMessage', data);
        // }
        
     })
  },
  computed: {
    ...mapGetters({
      user: 'user/getLocalUser',
      messages: 'message/getMessages',
    })
  },
  beforeDestroy: function(){
    this.rws = null;
  }
}
</script>

<style lang="css" scoped>
</style>
