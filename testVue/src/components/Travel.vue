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

import {getTravel} from '../utils/requests'

export default {

  name: 'Travel',
  data () {
    return {
    	travel: null
    }
  },
  methods:{
      getTravel: function () {
        // var url = link + this.$route.params.id + '/';
        // Vue.http.headers.common['content-type'] = 'json'
        // this.$http.get(url).then(function(response){
        //   this.travel = response.data;
        //   console.log(response.data);
        // }, function(err){
        //   console.log(err.statusText);
        // })
        getTravel(this.$route.params.id).then(response => {
          this.travel = response.data
        }).catch(err => {
          alert(err.response)
        })
      }
  },
  mounted: function(){
      this.getTravel();
  },
  computed: {
    empty: function(){
      return this.travel === null;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
