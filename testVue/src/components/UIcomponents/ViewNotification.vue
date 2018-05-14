<template>
<div>
  <h1> Notifications</h1>
	<ul class="messages" v-chat-scroll>
  <li class="message" v-for="notification in notifications"> At time: {{notification.created_time}} <br> {{notification.source}} sent you a notification:  {{ notification.subject }}</li>
  </ul>
</div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket'
import {joinInUserNotificationUrl} from '@/utils/requests'
import {mapGetters} from 'vuex'


export default {
  name: 'ViewNotification',
  props: [
    'userid',
  ],
  data () {
    return {
      rws : null,
    }
  },
  methods:{      
      loadHistoryMessage: function(){
        var payload = {}
        payload['travel_group'] = this.group;
        this.$store.dispatch('message/loadHistoryMessage', payload);
      }

  },
  mounted: function(){
    this.$store.dispatch('message/loadHistoryNotification');
     let url = joinInUserNotificationUrl(this.userid);
     this.rws = new ReconnectingWebSocket(url, undefined, {maxRetries: 3});
     var notification = null;
     this.rws.addEventListener('message', function(event){
       var data = JSON.parse(event.data);
        console.log(data);
        notification = data;
     })
     this.$store.dispatch('message/addNotification', notification)
    //  this.rws.onmessage = function(message){
    //     var data = JSON.parse(message.data);
    //     console.log(data);
    //     console.log(this.messages);
    //     this.messages.push(data);
    //   }
  },
  computed: {
    ...mapGetters({
      notifications: 'message/getNotifications',
    })
  },
  beforeDestroy: function(){
    this.rws = null;
  }
}
</script>

<style lang="css" scoped>
</style>
