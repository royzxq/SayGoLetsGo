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
    <ViewNotification v-bind:userid="local_user.id"/>
  </div>
	</div>
</template>

<script>

import {mapGetters} from 'vuex'
import ViewNotification from '@/components/UIcomponents/ViewNotification'
import sendNotification from '@/components/UIcomponents/sendNotification'
export default {

  name: 'UserInfo',
  components: {
    ViewNotification,
    sendNotification,
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
    },
    is_friend: function(){
      if(! this.is_self){
        for(var i in this.user.friend){
          if(this.user.friend[i].user.username == this.local_user.username){
            return true;
          }
        }
      }
      return false;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
