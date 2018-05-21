<template>
	<div>
    <label >Add a friend to your plan</label>
    <my-singleselect v-bind:options="users" :label="'username'"/>
	<button v-on:click="submit"> Add Users</button>
	</div>
</template>

<script>
import { printResponse } from "@/utils/helper";
import mySingleselect from "@/components/UIcomponents/singleselect";
import { mapGetters } from "vuex";

export default {
  name: "MembershipForm",
  data: function() {
    return {};
  },
  props: ["travel"],
  components: {
    mySingleselect
  },
  methods: {
    submit: function() {
      var obj = {};
      obj.travel_group = this.travel;
      obj.user = this.user.id;
      this.$store
        .dispatch("membership/createMembership", obj)
        .then(() => {
          this.$emit("submit");
          this.$router.go(0);
        })
        .catch(error => {
          printResponse("create membership failed", error);
        });
    }
  },
  mounted() {
    this.$store.dispatch("user/fetchUsers");
  },
  computed: {
    ...mapGetters({
      users: "user/getUsers",
      user: "options/getValue"
    })
  }
};
</script>

<style lang="css" scoped>
</style>
