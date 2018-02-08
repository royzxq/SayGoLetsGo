<template>
	<div>
		<ul>
			<li v-for="timespan in timespans">
				<div v-on:click="goToTimespan(timespan.id)">
				<p>
					Activity:  {{timespan.activity}}
				</p>
				<p> Travel: {{timespan.travel}} </p>
				<!-- to do: get travel name instead of travel id -->
				</div>
			</li>
		</ul>
		<router-link :to="{name: 'TimespanForm'}"> Create time span</router-link>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/test_app/timespans/'
var data = {
	timespans: null
}
export default {
	name: 'TravelList',
	data: function(){
		return data;
	},
	methods:{
	    getTimespans: function () {
	      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tWeb_access_token')
	      this.$http.get(link).then(function(response){
	        this.timespans = response.data;
	        console.log(response.data);
	      }, function(err){
	        this.timespans = null
	        console.log(err.statusText);
	      })
	    },
	    goToTimespan: function(id){
	    	this.$router.push({name:'Timespan', params:{id}})
	    }
	},
	mounted: function(){
    	this.getTimespans();
	}

}
</script>

<style lang="css" scoped>
</style>
