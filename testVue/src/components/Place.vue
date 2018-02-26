<template>
<div v-if="place !== null">
<span> Name: {{place.name}}</span>
<span> Country: {{place.country}} </span>
<span> City: {{place.city}}</span>
<span> Description: {{place.description}}</span>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  name: 'Place',
  computed: {
    ...mapGetters({
      place: 'place/getPlace'
    }),
  },
  mounted: function(){
  }
}
</script>

<style lang="css" scoped>
</style>
