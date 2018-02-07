<template>
	<div>
		<p> Username  </p>
		<input v-model="username" placeholder="Username">
		<p> Password </p>
		<input v-model="password" placeholder="Password">
		<button v-on:click="login"> Login</button><button v-on:click="logout"> Logout</button>
	</div>
</template>

<script>
var link = "http://127.0.0.1:8000/o/token/"
var clientID = '1DpyNljw31M1XFOjGUVFnxGaq8Fd3KoQQKsSqyVW'
var clientSec = '6TPMoAGyRjcRWcMNeb8LgBiZZk4DNFxYDPmgsl2lHQNEWGew81m3aSEJAaZNiacxY8t5q7eRF9rWAgFSYaoq9XbINTh2A528DMj9vfZppxYlRwxiURhIgXam6njZ2INd'

function ShowTheObject(obj){
  var des = "";
    for(var name in obj){
    des += name + ": " + obj[name] + "\n"
     }
  alert(des)
}

export default {

  name: 'login',

  data () {
    return {
    	username: null,
    	password: null
    }
  },
  methods: {
    login: function () {
      var tokenRequester = {}
      tokenRequester.username = this.username
      tokenRequester.password = this.password
      tokenRequester.username = 'testUser2'
      tokenRequester.password = 'k4H33TMgyeCMXk3q'
      tokenRequester.grant_type = 'password'
      tokenRequester.client_id = clientID
      tokenRequester.client_secret = clientSec
      //Vue.http.headers.common['Content-Type'] = 'application/json';
      Vue.http.headers.common['Content-Type'] = "application/x-www-form-urlencoded"
      this.$http.post(link, tokenRequester, { emulateJSON : true}).then(
        function (response) {
          console.log(response.data)
          ShowTheObject(response.data)
          localStorage.setItem('tWeb_access_token', response.data.access_token)
          localStorage.setItem('tWeb_username', tokenRequester.username)
        },
        function (err) {
          console.log(err.statusText)
          alert('err: ' + err.statusText)
        }
      )
    },
    logout: function () {
      localStorage.setItem('tWeb_access_token', '')
      localStorage.setItem('tWeb_username', '')
      Vue.http.headers.common['Authorization'] = ''
    }
  }
}
</script>

<style lang="css" scoped>
</style>
