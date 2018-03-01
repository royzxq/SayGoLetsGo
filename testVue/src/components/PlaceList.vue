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
	</div>
</template>

<script>
import {mapGetters} from "vuex"
export default {

  name: 'PlaceList',

  data () {
    return {
    }
  },
  methods:{
	    
	},
	mounted: function(){
    this.$store.dispatch('place/fetchPlaces')
  },
  computed: {
    ...mapGetters({
      places: 'place/getPlaces'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
