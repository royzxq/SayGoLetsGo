<template>
<div>
  <h1> Notifications</h1>
	<ul class="messages" v-chat-scroll>
  <li class="message" v-for="notification in notifications"> <span @click="readNotification(notification.id)"> At time: {{notification.created_time}} <br> {{notification.source}} sent you a notification </span> </li>
  </ul>
  <div v-if="show_detail">
    <notification v-bind:id="read_id" />
  </div>
</div>
</template>

<script>
import ReconnectingWebSocket from "reconnecting-websocket";
import { joinInUserNotificationUrl } from "@/utils/requests";
import { mapGetters } from "vuex";
import Notification from "@/components/UIcomponents/Notification"

export default {
  name: "ViewNotification",
  props: ["userid"],
  data() {
    return {
      rws: null,
      show_detail: false,
      read_id: null,
    };
  },
  components: {
    Notification
  },
  methods: {
    loadHistoryNotification: function() {
      var payload = {};
      payload["travel_group"] = this.group;
      this.$store.dispatch("message/loadHistoryNotification", payload);
    },
    readNotification: function(id){
      this.show_detail = true;
      this.read_id = id;
    }
  },
  mounted: function() {
    this.$store.dispatch("message/loadHistoryNotification");
    let url = joinInUserNotificationUrl(this.userid);
    this.rws = new ReconnectingWebSocket(url, undefined, { maxRetries: 3 });

    let vm = this;
    this.rws.addEventListener("message", function(event) {
      var data = JSON.parse(event.data);
      console.log(data);
      console.log("receiving notification");
      vm.$store.dispatch("message/addNotification", data);
    });
  },
  computed: {
    ...mapGetters({
      notifications: "message/getNotifications"
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
