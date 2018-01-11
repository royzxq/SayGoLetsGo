<template>
	<div>
		<ul>
			<li v-for="place in places">
				<p>
				<p>
					Place Name:  {{place.name}}
				</p>
				<p> Description: {{place.description}} </p>
				<p> Location: {{place.location}} </p>
				</p>
			</li>
		</ul>
		<router-link :to="{name: 'Place'}"> Create Places</router-link>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/testApp/places/';
export default {

  name: 'PlaceList',

  data () {
    return {
    	places: null
    }
  },
  	methods:{
	    getPlaces: function () {
	      this.$http.get(link).then(function(response){
	        this.places = response.data;
	        console.log(response.data);
	      }, function(err){
	        console.log(err.statusText);
	      })
	    }
	},
	mounted: function(){
    	this.getPlaces();
	}
}
</script>

<style lang="css" scoped>
</style>