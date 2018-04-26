<template>
  <div>
	<div v-if="!is_logged">
		<p> Username  </p>
		<input v-model="username" placeholder="Username">
		<p> Password </p>
		<input v-model="password" placeholder="Password">
    <br>
		<button v-on:click="login"> Login</button>
    <router-link :to="{name: 'UserForm'}"> Create User</router-link>
	</div>
  <div v-else>
      <p> Already logged in </p>
      <router-link :to="{name: 'UserView'}"> Home</router-link>
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
import {generate_token_request, logout, is_logged_in, login_user} from '@/utils/auth.js'
import {getUsers} from '@/utils/requests'

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
      var tokenRequester = generate_token_request(this.username, this.password)
      this.$http.post(link, tokenRequester, { emulateJSON : true, headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      }}).then(
        function (response) {
          console.log(response)
          // ShowTheObject(response.data)
          localStorage.setItem('tWeb_access_token', response.data.access_token)
          localStorage.setItem('tWeb_username', tokenRequester.username)
          var expire = response.data.expires_in
          var seconds = new Date().getTime() / 1000
          console.log(seconds)
          expire = seconds + expire
          console.log(expire)
          localStorage.setItem('tWeb_expired', expire)
          var user = {
            username: tokenRequester.username
          }
          this.$router.push({name: 'UserView'})
        },
        function (err) {
          console.log(err.statusText)
          alert('err: ' + err.statusText)
        }
      )
      // login_user(this.username, this.password).then(response => {
      //   ShowTheObject(response.data);
      //   localStorage.setItem('tWeb_access_token', response.data.access_token)
      //   localStorage.setItem('tWeb_username', tokenRequester.username)
      //   this.$router.push('/index')
      // }).catch(error => {
      //     console.log(error)
      //     alert('err: ' + error)
      // })
    },
    logout: function () {
      logout()
      this.$store.dispatch('user/deleteUser')
      this.$router.push('/index')
    }

  },
  computed: {
    is_logged: function(){
      let ret = is_logged_in();
      console.log('logged in is ' + ret)
      return ret
    }
  }
}
</script>

<style lang="css" scoped>
</style>
