<template>
	<div>
    <multiselect :value="values" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Pick some" :label=label :track-by=label @input="update">
      <template slot="tag" slot-scope="props"><span class="custom__tag"><span>{{ props.option[label] }}</span><span class="custom__remove" @click="props.remove(props.option)">❌</span></span></template>
    </multiselect>
	</div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import {mapState} from 'vuex'
export default {

  name: 'myMultiselect',
  props:[
    "options",
    "label",
  ],
  components: {
    Multiselect
  },
  methods:{      
      update: function(payload){
        this.$store.dispatch('options/SetValues', payload)
      },
  },
  mounted: function(){
  },
  computed: {
    ...mapState({
      values: ['options', 'values']
    })
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped>
</style>
