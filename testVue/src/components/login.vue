<template>
	<div>
		<p> Username  </p>
		<input v-model="username" placeholder="Username">
		<p> Password </p>
		<input v-model="password" placeholder="Password">
		<button v-on:click="login"> Login</button>
	</div>
</template>

<script>
var link = "http://127.0.0.1:8000/o/token/"
var clientID = "1DpyNljw31M1XFOjGUVFnxGaq8Fd3KoQQKsSqyVW"
var clientSec = "6TPMoAGyRjcRWcMNeb8LgBiZZk4DNFxYDPmgsl2lHQNEWGew81m3aSEJAaZNiacxY8t5q7eRF9rWAgFSYaoq9XbINTh2A528DMj9vfZppxYlRwxiURhIgXam6njZ2INd"

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
  		var user = {}
  	}
  }
}
</script>

<style lang="css" scoped>
</style>