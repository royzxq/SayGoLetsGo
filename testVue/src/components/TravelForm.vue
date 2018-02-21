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
			group_name: null,
			group_id: null,
			user_id: null,
			is_public: false
  	}
  },
  methods:{
  	submit: function(){
			if(localStorage.getItem('tWeb_userId') === null){
				var name = localStorage.getItem('tWeb_username')
				var param = {
					username: name
				}
				getUsers(param).then(response => {
					 var user = response.data.results[0]
					 this.user_id = user.id
					 localStorage.setItem("tWeb_userId", this.user_id)
					 this.createTravelsImpl()
				}).catch(error => {
					console.log("get user failed")
				})
			}
			else{
				this.user_id = localStorage.getItem('tWeb_userId')
				this.createTravelsImpl()
			}
		},
		createTravelsImpl: function(){
			var group = {
				group_name : this.group_name,
				manager_id : this.user_id,
				users: [
					this.user_id
				],
				is_public: this.is_public
			}
			console.log(group)
			createGroup(group).then(response=>{
				console.log(response.data)
				this.group_id = response.data.id
				var travel = {
					title: this.title,
					days: this.days,
					country: this.country,
					group: this.group_id
				}
				console.log("travel is ")
				console.log(travel)
				createTravel(travel).then(response=>{
					console.log(response.data)
					this.$route.push('/index')
				}).catch(error => {
					console.log("create travel failed")
					console.log(error)
				})
			}).catch(error => {
				console.log("create Group failed")
				console.log(error.response)
			})
		}
  }
}
</script>

<style lang="css" scoped>
</style>

