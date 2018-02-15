<template>
	<div>
	<input v-model="username" placeholder="Username">
	<input v-model="password" placeholder="Password">
	<input v-model="email" placeholder="Email">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {createUser} from '../utils/requests'

export default {
  name: 'UserForm',
  data: function () {
      return {
        username: null,
	    password: null,
        email: null,
        profile: null
    }
  },
  methods:{
  	submit: function(){
  		var user = {}
        user.username = this.username
        user.password = this.password
        user.email = this.email
        user.profile = this.profile
  		createUser(user).then(response => {
              console.log("create user success " + response.data);
              this.$router.push({name:'login'})
          }).catch(error => {
              console.log("create user failed" + error);
              alert(error);
          })
  	}
  }
}
</script>

<style lang="css" scoped>
</style>

