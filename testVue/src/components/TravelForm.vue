<template>
	<div>
	<input v-model="title" placeholder="travel title">
	<input v-model="days" placeholder="travel days">
	<input v-model="country" placeholder="travel country">
	<input v-model="group" placeholder="travel group">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/test_app/travels/'
var Travel = {
	title: null,
	days: null,
	country: null,
	group: null
}

export default {

  name: 'TravelForm',

  data: function () {return {
	    title: null,
		days: null,
		country: null,
		group: null
  	}
  },
  methods:{
  	submit: function(){
  		var travel = {}
  		travel.title = this.title
  		travel.days = this.days
  		travel.country = this.country
  		travel.group = this.group
  		Vue.http.headers.common['Content-Type'] = "application/json"
      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tWeb_access_token')

  		this.$http.post(link, travel).then(function(response){
	        console.log(response.data);
	        this.$router.push('travels')
	      }, function(err){
	        console.log(err.statusText)
	    })
  	}
  }
}
</script>

<style lang="css" scoped>
</style>

