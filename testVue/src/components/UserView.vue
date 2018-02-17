<template>
	<div>
        <h2>Your groups</h2>
        <h3>Username: {{username}}</h3>
		<ul>
			<li v-for="(group, idx) in groups">
				<!-- <router-link :to="{name: 'Travel', params: {id: travel.id}}" v-on:click="goToTravel(idx)">	Title:  {{travel.title}} </router-link>
				<div >
				<router-view></router-view>
				</div> -->
                <router-link :to="{name: 'TravelView', params:{group_id: group.id}}">
                <div> Group_name: {{group.group_name}} </div>
                <div v-if="group.travelplan!==null"> Travel Name: {{group.travelplan}}</div>
                <div v-else>No travel Created</div>
                </router-link>
			</li>
		</ul>
		<!-- <router-link :to="{name: 'TravelForm'}"> Create travels</router-link> -->
		
	</div>
</template>

<script>


import {getTravelList, getGroups} from '../utils/requests';

export default {
	name: 'UserView',
	data: function(){
		return {
			travels: [],
			groups: [],
		}
	},
	methods:{
	    getGroups: function () {
			getGroups().then(response => {
				this.groups = response.data.results;
				// console.log(response.data.results);
			}).catch(error => {
				this.reset()
				console.log(error)
				alert(error)
				this.$router.push({name: 'login'})
			})
        },
        goToGroup: function(id){
            
        },
		reset: function(){
			this.groups = []
		}
	},
	mounted: function(){
    	this.getGroups();
    },
    computed:{
        username: function(){
            return localStorage.getItem('tWeb_username')
        }
    }
}
</script>

<style lang="css" scoped>
</style>
