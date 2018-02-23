<template>
	<div>
	<h3> Travel Info </h3>
	<input v-model="title" placeholder="travel title">
	<input v-model="days" placeholder="travel days">
	<input v-model="country" placeholder="travel country">
	<br>
	<h3> Group Info </h3>
	<!-- <input v-model="group" placeholder="travel group"> -->
	<input v-model="group_name" placeholder="Group name">
	<input type="checkbox" id="is_public" v-model="is_public">
	<label for="is_public">Is Public?</label>

	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {getUsers, createGroup, createTravel} from '../utils/requests'


export default {

  name: 'TravelForm',

  data: function () {
	  return {
			title: null,
			days: null,
			country: null,
			group_name: null,
			group_id: null,
			user_id: null,
			is_public: false
  	}
  },
  methods:{
  	submit: function(){
			this.createTravelsImpl()
		},
		createTravelsImpl: function(){
			var group = {
				group_name : this.group_name,
				is_public: this.is_public
			}
			var travel = {
				title: this.title,
				days: this.days,
				country: this.country
			}
			var payload = {}
			payload.group = group
			payload.travel = travel
			this.$store.dispatch('groupTravel/createGroupAndTravel', payload)
			this.$route.push('/index')
		}
  }
}
</script>

<style lang="css" scoped>
</style>

