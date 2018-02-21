<template>
<div>
<span> Name: {{place.name}}</span>
<span> Country: {{place.country}} </span>
<span> City: {{place.city}}</span>
<span> Description: {{place.description}}</span>
</div>
</template>

<script>
import {getPlace} from '../utils/requests' 
export default {

  name: 'Place',

  data () {
    return {
      place: null
    }
  },
  methods:{
    getPlace: function(){
      getPlace(this.$route.params.id).then(response => {
        this.place = response.data;
      }).catch(error => {
        console.log("get place failed " + this.$route.params.id);
        console.log(error)
        // alert(error.response)
      })
    }
  },
  mounted: function(){
    this.getPlace();
  }
}
</script>

<style lang="css" scoped>
</style>
