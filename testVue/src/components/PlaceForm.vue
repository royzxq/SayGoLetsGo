<template>
	<div>
	<input v-model="name" placeholder="place name">
	<input v-model="country" placeholder="country">
	<input v-model="city" placeholder="city">
	<input v-model="description" placeholder="place description">
	<input v-model="location" placeholder="place location">
	<input type="checkbox" id="is_public" v-model="is_public">
	<label for="is_public">Is Public?</label>
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {createPlace} from '../utils/requests'
export default {
  name: 'PlaceForm',
  data: function () {return {
	    name: null,
		description: null,
		location: null,
		country: null,
		city: null,
		is_public: true
  	}
  },
  methods:{
  	submit: function(){
		if (localStorage.getItem('tWeb_userId') !== null){
			var place = {}
			place.name = this.name
			place.description = this.description
			place.location = this.location
			place.country = this.country
			place.city = this.city
			place.user = localStorage.getItem('tWeb_userId')
			place.is_public = this.is_public
			createPlace(place).then(response => {
				console.log(response.data)
				this.$router.push('/index')
			}).catch(error => {
				console.log('created places failed')
				console.log(error)
			})
		}
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
