<template>
	<div>
		<ul>
			<li v-for="(travel, idx) in travels">
				<router-link :to="{name: 'Travel', params: {id: travel.id}}" v-on:click="goToTravel(idx)">	Title:  {{travel.title}} </router-link>
				<div >
				<router-view></router-view>
				</div>
			</li>
		</ul>
		<router-link :to="{name: 'TravelForm'}"> Create travels</router-link>
		
	</div>
</template>

<script>

var link = 'http://127.0.0.1:8000/test_app/travels/'
var data = {
	travels: null
}
import {getTravelList, } from '../utils/requests';

export default {
	name: 'TravelList',
	data: function(){
		return {
			travels: [],
			showing: [],
			groups: []
		}
	},
	methods:{
	    getTravels: function () {
			getTravelList().then(response => {
				this.travels = response.data.results;
				// console.log(response.data.results);
				this.showing = Array(this.travels.length).fill(false)
				console.log(this.showing)
			}).catch(error => {
				this.reset()
				console.log(error)
				alert(error)
				this.$router.push({name: 'login'})
			})
	    },
	    goToTravel: function(id, idx){
			// this.$router.push({name:'Travel', params:{id}})
			showing[idx] = true
		},
		
		set_show: function(idx){
			if(idx < this.showing.length){
				this.showing[idx] = true
			}
		},
		reset: function(){
			this.travels = null
			this.showing = null
		}
	},
	mounted: function(){
    	this.getTravels();
	},
	computed: {
		is_show: function(idx){
			if(idx < this.showing.length){
				return this.showing[idx]
			}
		}
	}

}
</script>

<style lang="css" scoped>
</style>
