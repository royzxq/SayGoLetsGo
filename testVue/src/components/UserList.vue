<template>
	<div>
    <input type="text" v-model="search" placeholder="search username" />
    <div v-for="user in filteredList">
      Username: {{user.username}}
    </div>
	
	</div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {

  name: 'UserList',
  data () {
    return {
      // filter_list : [],
      search: "",
    }
  },
  methods:{      
      goBack: function(){
          this.$router.go(-1);
      }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    }),
    filteredList(){
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
