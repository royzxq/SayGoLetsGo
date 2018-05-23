<template>
	<div>
    <button v-on:click="goBack">Go Back</button>
	<p>
		Username:  {{user.username}}
	</p>
	<p> Email: {{user.email}} </p>
	<p> Id: {{user.id}} </p>
  <h3> Friends </h3>
  <div v-for="friend in user.friend">
    {{friend.user.username}}
  </div>
  <div v-if="!is_self && !is_friend">
  <button v-on:click="make_friend">Send friend request</button>
  </div>
  <div v-else-if="is_friend">
    You are friends
    <send-notification v-bind:userid="user.id"/>
  </div>
  <div v-else>
    <ViewNotification v-bind:userid="user.id"/>
  </div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import ViewNotification from "@/components/UIcomponents/ViewNotifications";
import sendNotification from "@/components/UIcomponents/sendNotification";
import { getLocalUsername } from "@/utils/helper";
export default {
  name: "UserInfo",
  components: {
    ViewNotification,
    sendNotification
  },
  data() {
    return {
      is_self: false,
      is_friend: false
    };
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    make_friend() {
      var payload = {
        user2: this.user.id
      };
      this.$store
        .dispatch("user/createFriendship", payload)
        .then(response => {})
        .catch(error => {});
    }
  },
  mounted: function() {
    // this.getUser();
    this.$store
      .dispatch("user/setId", this.$route.params.id)
      .then(() => {
        this.is_self = this.user.username === getLocalUsername();
        for (var i in this.user.friend) {
          if (this.user.friend[i].user.username == getLocalUsername()) {
            this.is_friend = true;
          }
        }
        if (this.is_self) {
          this.$store.dispatch("message/loadHistoryNotification");
        }
      })
      .catch(error => {
        console.log("fetch user failed");
      });
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
      notifications: "message/getNotifications"
    })
  }
};
</script>

<style lang="css" scoped>
</style>
