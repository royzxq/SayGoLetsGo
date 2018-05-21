<template>
	<div>
    <input type="text" v-model="search" placeholder="search place" />
    <div v-for="place in filteredList">
      Place name: {{place.name}}
    </div>
	
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  data() {
    return {
      // filter_list : [],
      search: ""
    };
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
    this.$store.dispatch("place/fetchPlaces");
  },
  computed: {
    ...mapGetters({
      places: "place/getPlaces"
    }),
    filteredList() {
      return this.places.filter(place => {
        return place.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>
