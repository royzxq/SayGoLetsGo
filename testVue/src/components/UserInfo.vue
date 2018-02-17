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

import {getUserId} from '../utils/requests'

export default {

  name: 'UserInfo',
  data () {
    return {
    	user: null
    }
  },
  methods:{
      getUser: function () {
       
        getUserId(this.$route.params.id).then(response => {
            console.log(response.data)
          this.user = response.data
        }).catch(err => {
          alert(err.response)
        })
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
