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
			<li v-for="(travelGroup, idx) in travelGroups">
				<div v-on:click="checkGroupTravel(travelGroup.id)">
                <router-link :to="{name: 'TravelView', params:{id : travelGroup.id}} ">
                <div> Title: {{travelGroup.title}} </div>
                <div> Travel Days: {{travelGroup.days}}</div>
                <div> Is Public: {{travelGroup.is_public}}</div>
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
			// this.$store.dispatch('groupTravel/setId', group_id)
		}
	},
	mounted: function(){
		this.$store.dispatch('groupTravel/fetchTravelGroups')
    },
    computed:{
        username: function(){
            return localStorage.getItem('tWeb_username')
		},
		...mapGetters({
			travelGroups: 'groupTravel/getTravelGroups',
			user_id: 'user/getId'
		}),
    }
}
</script>

<style lang="css" scoped>
</style>
