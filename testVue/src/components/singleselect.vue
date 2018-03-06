<template>
	<div>
    <multiselect :value="value" :options="options" :custom-label="customlabel" placeholder="Select one" :label=label :track-by=label @input="update"/>
	</div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import {mapState} from 'vuex'
export default {

  name: 'mySingleselect',
  props:[
    "options",
    "label",
    "customlabel"
  ],
  components: {
    Multiselect
  },
  methods:{      
      update: function(payload){
        this.$store.dispatch('options/SetValue', payload)
      },
  },
  mounted: function(){
  },
  computed: {
    ...mapState({
      value: ['options', 'value']
    })
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped>
</style>
