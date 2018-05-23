<template>
<div>
  <h1> Send a Notification</h1>
	<input type="text" v-model="subject" placeholder="subject"> 
  <input type="text" v-model="content" placeholder="content">
  <button v-on:click="send">Send</button>
</div>
</template>

<script>
import ReconnectingWebSocket from "reconnecting-websocket";
import { joinInUserNotificationUrl } from "@/utils/requests";
import { mapGetters } from "vuex";

export default {
  name: "ViewNotification",
  props: ["userid"],
  data() {
    return {
      rws: null,
      subject: null,
      content: null
    };
  },
  methods: {
    send: function() {
      var m = {};
      m["source"] = this.localuser.username;
      m["content"] = this.content;
      m["subject"] = this.subject;
      if (this.rws !== null) {
        console.log("sending notification");
        this.rws.send(JSON.stringify(m));
      }
    }
  },
  mounted: function() {
    let url = joinInUserNotificationUrl(this.userid);
    this.rws = new ReconnectingWebSocket(url, undefined, { maxRetries: 3 });
  },
  computed: {
    ...mapGetters({
      localuser: "user/getLocalUser"
    })
  },
  beforeDestroy: function() {
    this.rws.close();
    this.rws = null;
  }
};
</script>

<style lang="css" scoped>
</style>
