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
  <button v-on:click="make_friend">Send friend request</button>
	</div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {

  name: 'UserInfo',
  methods:{      
      goBack: function(){
          this.$router.go(-1);
      },
      make_friend(){
        var payload = {
          user: this.user.id
        }
        this.$store.dispatch('user/createFriendship', payload).then(response => {

        }).catch(error => {

        })
      }
  },
  mounted: function(){
      // this.getUser();
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
  }
}
</script>

<style lang="css" scoped>
</style>
