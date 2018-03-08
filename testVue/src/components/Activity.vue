<template>
<div @click="show_submit()">
  <label>Activity: </label>
  <editable :content="activity.activity" @update="activity.activity=$event" />
  <label >Start time:</label>
  <editable :content="activity.start_time" @update="activity.start_time=$event" />
  <p v-if="activity.place!==null">
      <span v-on:click="checkPlace(activity.place.id)"> 
      <router-link :to="{name:'Place'}" >Check Place</router-link>
          Place: {{ activity.place.name }}
      </span>
  </p>
  
  <div v-if="showSubmit">
    <button type="submit" >Submit Change</button>
    <button @click="deleteactivity()">Delete</button>
  </div>
</div>
</template>

<script>
import editable from '@/components/Editable.vue'
import {printResponse} from '@/utils/helper'
export default {

  name: 'activity',
  props: [
    'activity'
  ],
  data () {
    return {
      showSubmit: false
    }
  },
  components:{
    editable,
  },
  methods: {
    show_submit: function(){
      this.showSubmit = true
    },
    submit: function(){
      var activity = this.activity
      this.$store.dispatch('activity/updateActivity', activity).then(()=>{
        this.showSubmit = false
      }).catch(error => {
        printResponse("update place failed", error)
      });
      
    },
    checkPlace: function(id){
      this.$emit('checkPlace', id)
    },
    deleteactivity: function(){
      this.$store.dispatch('activity/deleteActivity', this.activity.id).then(() => {
        this.showSubmit = false
      }).catch(error => {
        printResponse("delete activity failed", error)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
