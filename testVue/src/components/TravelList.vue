<template>
	<div>
    <input type="text" v-model="search" placeholder="search travel" />
    <div v-for="travel in filteredList">
      Username: {{travle.title}}
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
      travles: 'groupTravel/getTravelGroups'
    }),
    filteredList(){
      return this.users.filter(travel => {
        return user.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
