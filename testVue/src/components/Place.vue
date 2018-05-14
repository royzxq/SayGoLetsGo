<template>
<div v-if="place !== null"  v-on:click="show_submit()">
<label>Name: </label>
<!-- <span contentEditable="true" v-on:click="" v-bind="place.name"> {{place.name}}</span> -->
<editable :content="place.name"  v-on:update="place.name=$event" />
<label>Country: </label>
<editable :content="place.country" @update="place.country=$event"/>
<label>City: </label>
<editable :content="place.city" @update="place.city=$event"/>
<label >Description: </label>
<editable :content="place.description" @update="place.description=$event"/>
<div  v-if="showSubmit.showing"> 
  <button v-on:click="submit">Submit change</button>
  <button @click="deleteplace()">Delete</button>
</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import editable from '@/components/UIcomponents/Editable.vue'
import {printResponse} from '@/utils/helper'
export default {

  name: 'Place',
  data () {
    return {
      showSubmit: {
        showing: false
      }
    }
  },
  components: {
    editable
  },
  methods: {
    submit: function(){
      
      var place = this.place 
      this.$store.dispatch('place/updatePlace', place).then(()=>{
        this.showSubmit.showing = false
      }).catch(error => {
        printResponse("update place failed", error)
      })
    },
    show_submit: function(){
      this.showSubmit.showing = true
    },
    deleteplace: function(){
      var vue_instance = this
      this.$store.dispatch('place/deletePlace', this.place.id).then(() => {
        this.showSubmit.showing = false
        vue_instance.$router.go(-1)
      }).catch(error => {
        printResponse("delete place failed", error)
      })
    }
  },
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
