<template>
	<div>
	<p>
		Title:  {{travel.title}}
	</p>
	<p> Days: {{travel.days}} </p>
	<p> Country: {{travel.country}} </p>
	</div>
</template>

<script>
var link = 'http://127.0.0.1:8000/test_app/travels/'
export default {

  name: 'Travel',
  data () {
    return {
    	travel: null
    }
  },
  methods:{
      getTravel: function () {
        var url = link + this.$route.params.id + '/';
        Vue.http.headers.common['content-type'] = 'json'
        this.$http.get(url).then(function(response){
          this.travel = response.data;
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