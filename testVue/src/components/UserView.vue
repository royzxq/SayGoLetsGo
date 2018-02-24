<template>
	<div>
        <h2>Your groups</h2>
        <h3>Username: 
			<div v-on:click="checkUser(username)">
			<router-link :to="{name: 'UserInfo' }">
			{{username}}
			</router-link>
			</div>
		</h3>
		<ul>
			<li v-for="(group, idx) in groups">
				<div v-on:click="checkGroupTravel(group.id)">
                <router-link :to="{name: 'TravelView'}">
                <div> Group_name: {{group.group_name}} </div>
                <div v-if="group.travelplan!==null"> Travel Name: {{group.travelplan}}</div>
                <div v-else>No travel Created</div>
                </router-link>
				</div>
			</li>
		</ul>
		<button v-on:click="createTravel()"> Creat Travel and Group </button>
		<button v-on:click="createPlace()"> Create Place </button>
		<!-- <router-link :to="{name: 'TravelForm'}"> Create travels</router-link> -->
		
	</div>
</template>

<script>


import {getTravelList, getGroups} from '../utils/requests';
import {mapGetters} from 'vuex'
export default {
	name: 'UserView',
	methods:{
		createTravel: function(){
			this.$router.push({name: 'TravelForm'})
		},
		createPlace: function(){
			this.$router.push({name: 'PlaceForm'})
		},
		checkUser: function(username){
			var user = {
				username: username
			}
			this.$store.dispatch('user/fetchLocalUser', user);
		},
		checkGroupTravel: function(group_id) {
			this.$store.dispatch('groupTravel/setId', group_id)
		}
	},
	mounted: function(){
		this.$store.dispatch('groupTravel/fetchGroups')
    },
    computed:{
        username: function(){
            return localStorage.getItem('tWeb_username')
		},
		...mapGetters({
			groups: 'groupTravel/getGroups',
			user_id: 'user/getId'
		}),
    }
}
</script>

<style lang="css" scoped>
</style>
