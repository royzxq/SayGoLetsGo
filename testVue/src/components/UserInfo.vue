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
  <div v-if="!is_self">
  <button v-on:click="make_friend">Send friend request</button>
  </div>
  <div v-else>
    <ViewNotification v-bind:userid="user.id"/>
  </div>
	</div>
</template>

<script>

import {mapGetters} from 'vuex'
import ViewNotification from '@/components/ViewNotification'

export default {

  name: 'UserInfo',
  components: {
    ViewNotification,
  },
  methods:{      
      goBack: function(){
          this.$router.go(-1);
      },
      make_friend(){
        var payload = {
          user2: this.user.id
        }
        this.$store.dispatch('user/createFriendship', payload).then(response => {

        }).catch(error => {

        })
      }
  },
  mounted: function(){
      // this.getUser();
      var res = this.user.username === this.local_user.username;
      if(res){
        this.$store.dispatch('message/loadHistoryNotification');
      }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      local_user: 'user/getLocalUser',
      notifications: 'message/getNotifications',
    }),
    is_self: function(){
      var res = this.user.username === this.local_user.username;
      return res;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
