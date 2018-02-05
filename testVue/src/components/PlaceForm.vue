<template>
	<div>
	<input v-model="name" placeholder="place name">
	<input v-model="description" placeholder="place description">
	<input v-model="location" placeholder="place location">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/testApp/places/'

export default {

  name: 'PlaceForm',

  data: function () {return {
	    name: null,
		description: null,
		location: null
  	}
  },
  methods:{
  	submit: function(){
  		var place = {}
  		place.name = this.name
  		place.description = this.description
  		place.location = this.location
  		Vue.http.headers.common['Content-Type'] = "application/json";
  		this.$http.post(link, place).then(function(response){
	        console.log(response.data);
	        this.$router.push('places')
	      }, function(err){
	        console.log(err.statusText);
	    })
  	}
  }
}
</script>

<style lang="css" scoped>
</style>