<template>
	<div>
	<input v-model="activity" placeholder="What is the activity">
  <my-singleselect :options="activity_options" id="1" />
	<input v-model="start_date" placeholder="start_date">
    <input v-model="start_time" placeholder="start_time">
	<input v-model="duration" placeholder="duration">
	<input v-model="note" placeholder="note">
  <my-singleselect :options="places" :label="'name'" id="2" />
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import mySingleselect from '@/components/singleselect'
import {mapGetters} from 'vuex'
export default {
  name: 'ActivityForm',
  data: function () {return {
      activity: null,
      start_date: null,
		  start_time: null,
		  duration: null,
		  note: null,
      place_id: null,
      activity_options: ["traffic", "meal", "sightseeing"]
        
  	}
  },
  components: {
    mySingleselect
  },
  mounted() {
    this.$store.dispatch('place/fetchPlaces')
  },
//   props: ['travel_id'],
  methods:{
  	submit: function(){
        var obj = {}
        obj.activity = this.activity
        obj.start_date = this.start_date
        obj.start_time = this.start_time
        obj.duration = this.duration
        obj.note = this.note
        obj.travel = this.$route.params.travel
        obj.place_id = this.place_id
        var vue_instance = this
        this.$store.dispatch('activity/createActivity', obj).then(()=>{
          this.$router.push('/index')
        }).catch(error => {
            console.log('created places failed')
            console.log(error)
        })
  	}
  },
  computed: {
    ...mapGetters({
      places: 'place/getPlaces',
      getValue: 'options/getValue'
    }),
  }
}
</script>

<style lang="css" scoped>
</style>
