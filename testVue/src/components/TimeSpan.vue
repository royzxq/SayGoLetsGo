<template>
	<div>
	<p>Activity:  {{timespan.activity}}</p>
	<p> Start time: {{timespan.start_time}} </p>
	<p> Duration: {{timespan.duration}} </p>
	<p> Note: {{timespan.note}} </p>
	<p> Travel: {{timespan.travel}} </p> try: {{travel.country}} </p>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/testApp/timespans/'
export default {

  name: 'TimeSpan',
  data () {
    return {
    	timespan: null
    }
  },
  methods:{
      getTravel: function () {
        var url = link + this.$route.params.id;
        // Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080'
        this.$http.get(url, {}, {headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        }}).then(function(response){
          this.timespan = response.data;
          console.log(response.data);
        }, function(err){
          console.log(err.statusText);
        })
      }
  },
  mounted: function(){
      this.getTravel();
  }
}
</script>

<style lang="css" scoped>
</style>