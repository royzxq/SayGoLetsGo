<template>
	<div>
		<ul>
			<li v-for="travel in travels">
				<p>
				<p>
					Title:  {{travel.title}}
				</p>
				<p> Days: {{travel.days}} </p>
				<p> Country: {{travel.country}} </p>

				</p>
			</li>
		</ul>
		<router-link :to="{name: 'Travel'}"> Create travels</router-link>
	</div>
</template>

<script>

var link = 'http://127.0.0.1:8000/testApp/travels/'
var data = {
	travels: null
}
export default {
	name: 'TravelList',
	data: function(){
		return data;
	},
	methods:{
	    getTravels: function () {
	      this.$http.get(link).then(function(response){
	        this.travels = response.data;
	        console.log(response.data);
	      }, function(err){
	        console.log(err.statusText);
	      })
	    }
	},
	mounted: function(){
    	this.getTravels();
	}

}
</script>

<style lang="css" scoped>
</style>