<template>
	<div>
	<input v-model="start_time" placeholder="timespan start_time">
	<input v-model="description" placeholder="timespan description">
	<input v-model="note" placeholder="timespan note">
	<input v-model="activity" placeholder="timespan activity">
	<input v-model="travel" placeholder="travel">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/test_app/timespans/'

export default {

  name: 'TimespanForm',

  data: function () {return {
	    start_time: null,
		description: null,
		note: null,
		travel: null,
		activity: null
  	}
  },
  methods:{
  	submit: function(){
  		var timespan = {}
  		timespan.start_time = this.start_time
  		timespan.description = this.description
  		timespan.note = this.note
  		timespan.activity = this.activity
  		timespan.travel = this.travel
  		Vue.http.headers.common['Content-Type'] = "application/json";
  		this.$http.post(link, timespan).then(function(response){
	        console.log(response.data);
	        this.$router.push('timespans')
	      }, function(err){
	        console.log(err.statusText);
	    })
  	}
  }
}
<style lang="css" scoped>
</style>