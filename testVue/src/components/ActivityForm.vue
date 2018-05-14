<template>
	<div>
    <label> What is the activity? </label>
  <my-singleselect :options="activity_options" id="1" />
  <label > Please select the start time </label>
  <DatePicker v-model="start_time" type="datetime" format="yyyy-MM-ddThh:mm" :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" lang="en"/>
  <br>
  <label> Add some note: </label> <br>
	<textarea v-model="note" placeholder="note" />
  <br>
  <label> Do you want to connect this activity to a place? </label>
  <my-singleselect :options="places" :label="'name'" id="2" />
	<button v-on:click="submit"> Submit</button>
  <button v-on:click="cancel"> Cancel </button>
	</div>
</template>

<script>
import mySingleselect from '@/components/UIcomponents/singleselect'
import DatePicker from 'vue2-datepicker'
import {mapGetters} from 'vuex'
export default {
  name: 'ActivityForm',
  data: function () {
    return {
      activity: null,
		  duration: null,
		  note: null,
      place_id: null,
      activity_options: ["Traffic", "Meal", "Sight seeing"],

      start_time: '',

    }

  },
  components: {
    mySingleselect,
    DatePicker
  },
  mounted() {
    this.$store.dispatch('place/fetchPlaces')
  },
//   props: ['travel_id'],
  methods:{
  	submit: function(){
        var obj = {}
        obj.activity = this.getValue("1")
        obj.start_time = this.start_time
        obj.note = this.note
        obj.travel = this.$route.params.travel
        var place = this.getValue("2")
        if (place !== null){
          obj.place = place.id
        }
        else{
          obj.place = null
        }
        console.log(obj)
        var vue_instance = this
        this.$store.dispatch('activity/createActivity', obj).then(()=>{
          this.$router.go(0)
        }).catch(error => {
            console.log('created activity failed')
            console.log(error)
        })
    },
    cancel(){
      this.$router.go(-1)
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
