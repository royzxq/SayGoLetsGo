<template>
	<div>
    <button v-on:click="goBack">Go Back</button>
	<p>
		Username:  {{user.username}}
	</p>
	<p> Email: {{user.email}} </p>
	<p> Id: {{user.id}} </p>
	</div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {

  name: 'UserInfo',
  methods:{      
      goBack: function(){
          this.$router.go(-1);
      }
  },
  mounted: function(){
      // this.getUser();
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
  }
}
</script>

<style lang="css" scoped>
</style>
