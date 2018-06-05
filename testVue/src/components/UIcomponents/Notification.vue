<template>
  <div>
    Time: {{notification.created_time}} <br>
    From: {{notification.source}} <br>
    Subject: {{notification.subject}} <br>
    Content: {{notification.content}}
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Notification',
  props: ["id"],
  mounted: function(){
    this.$store.dispatch("message/readNotification", this.id);
  },
  computed: {
    ...mapGetters({
      notification: "message/getNotification"
    })
  }
}
</script>

