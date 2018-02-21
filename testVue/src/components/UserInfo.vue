<template>
	<div>
    <button v-on:click="goBack">Go Back</button>
	<p>
		Username:  {{user.username}}
	</p>
	<p> Email: {{user.email}} </p>
	<p> Id: {{user.id}} </p>
	</div>
</template>

<script>

import {getUserId, getUsers} from '../utils/requests'

export default {

  name: 'UserInfo',
  data () {
    return {
    	user: null
    }
  },
  methods:{
      getUser: function () {
        if ("id" in this.$route.params){
          getUserId(this.$route.params.id).then(response => {
              console.log(response.data)
            this.user = response.data
          }).catch(err => {
            alert(err.response)
          })
        } else if ("username" in this.$route.params){
          var param = {
            username: this.$route.params.username
          }
          getUsers(this.$route.params).then(response => {
            this.user = response.data.results[0]
          }).catch(err => {
            alert(err.response)
            console.log("get user failed")
          })
        }
      },
      goBack: function(){
          this.$router.go(-1);
      }
  },
  mounted: function(){
      this.getUser();
  }
}
</script>

<style lang="css" scoped>
</style>
