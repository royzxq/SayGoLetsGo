<template>
  <div>
	<div v-if="is_logged_in()">
		<p> Username  </p>
		<input v-model="username" placeholder="Username">
		<p> Password </p>
		<input v-model="password" placeholder="Password">
    <br>
		<button v-on:click="login"> Login</button>
	</div>
  <div v-else>
      <p> Already logged in </p>
      <router-link :to="{name: '/'}"> Home</router-link>
  </div>
  <button v-on:click="logout"> Logout</button>
  </div>
</template>

<script>
var link = "http://127.0.0.1:8000/o/token/"

function ShowTheObject(obj){
  var des = "";
    for(var name in obj){
    des += name + ": " + obj[name] + "\n"
     }
  alert(des)
}
import {generate_token_request, logout, is_logged_in} from '../utils/auth.js'
export default {

  name: 'Login',

  data () {
    return {
    	username: null,
    	password: null
    }
  },
  methods: {
    login: function () {
      // auth.login_user(this.username, this.password).then(
      //   function (response) {
      //     console.log(response.data)
      //     // ShowTheObject(response.data)
      //     localStorage.setItem('tWeb_access_token', response.data.access_token)
      //     localStorage.setItem('tWeb_username', tokenRequester.username)
      //     // this.$router.push('/')
      //   }  
      // ).catch(function(err){
      //     console.log(err.statusText)
      //     alert('err: ' + err.statusText)
      // })
      var tokenRequester = generate_token_request(this.username, this.password)
      this.$http.post(link, tokenRequester, { emulateJSON : true, headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      }}).then(
        function (response) {
          console.log(response.data)
          ShowTheObject(response.data)
          localStorage.setItem('tWeb_access_token', response.data.access_token)
          localStorage.setItem('tWeb_username', tokenRequester.username)
          // this.$router.push('/')
        },
        function (err) {
          console.log(err.statusText)
          alert('err: ' + err.statusText)
        }
      )
    },
    logout: function () {
      logout()
      this.$router.push({name: 'login'})
    },
    is_logged_in: function(){
      return is_logged_in();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
