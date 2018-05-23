<template>
	<div>
	<h3> Travel Info </h3>
	<input v-model="title" placeholder="travel title">
	<input v-model="days" placeholder="travel days">
	<input v-model="country" placeholder="travel country">
	<br>
	<input type="checkbox" id="is_public" v-model="is_public">
	<label for="is_public">Is Public?</label>

	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
export default {
  name: "TravelForm",

  data: function() {
    return {
      title: null,
      days: null,
      country: null,
      is_public: false
    };
  },
  methods: {
    submit: function() {
      this.createTravelsImpl();
    },
    createTravelsImpl: function() {
      var travelgroup = {
        title: this.title,
        days: this.days,
        country: this.country,
        is_public: this.is_public
      };

      var vue_instance = this;
      this.$store
        .dispatch("groupTravel/createTravelGroup", travelgroup)
        .then(function() {
          vue_instance.$router.push("/index");
        })
        .catch(error => {
          alert("Info Error");
          console.log(error);
        });
    }
  }
};
</script>

<style lang="css" scoped>
</style>

