<template>
	<div>
    <multiselect :value="value" :options="options" :custom-label="customlabel" placeholder="Select one" :label=label :track-by=label @input="update"/>
	</div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import {mapState, mapGetters} from 'vuex'
export default {

  name: 'mySingleselect',
  props:[
    "options",
    "label",
    "customlabel",
    "id",
  ],
  components: {
    Multiselect
  },
  methods:{      
      update: function(payload){
        var obj = {}
        obj.id = this.id
        obj.value = payload
        this.$store.dispatch('options/SetValue', obj)
      },
  },
  mounted: function(){
    console.log("hei")
  },
  computed: {
    ...mapState('options', {
      value: state => {
        state.value[this.id]
      }
    }),
    // ...mapGetters({
    //   getValue: 'options/getValue'
    //   }),

    // search(){
    //   return this.getValue(this.id)
    // },
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped>
</style>
