<template>
  <multiselect :value="values" id="ajax" :label=label :track-by=label placeholder="Type to search" open-direction="bottom" :options="options" :multiple="true" :searchable="true" :loading="is_loading" :internal-search="false" :clear-on-select="false" :close-on-select="false" :options-limit="300" :limit="2" :limit-text="limitText" :max-height="600" :show-no-results="false" :hide-selected="true" @search-change="asyncFind">
      <template slot="clear" slot-scope="props">
        <!-- <div class="multiselect__clear" v-if="values.length" @mousedown.prevent.stop="clearAll(props.search)"></div> -->
      </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
    </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";
export default {
  name: "myAsyncesearch",
  props: ["options", "label", "asyncFunc"],
  data() {
    return {
      is_loading: false
    };
  },
  components: {
    Multiselect
  },
  methods: {
    asyncFind: function(query) {
      console.log(query);
      if (query.length < 3) {
        return;
      }
      this.is_loading = true;
      // this.users = []
      var payload = {
        search: query
      };
      this.asyncFunc(payload).then(() => {
        this.is_loading = false;
      });
    },
    update: function(payload) {
      this.$store.dispatch("options/SetValues", payload);
    },
    limitText(count) {
      return `and ${count} other choices`;
    }
  },
  mounted: function() {},
  computed: {
    ...mapState({
      values: ["options", "values"]
    })
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped>
</style>