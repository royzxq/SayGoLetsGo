<template>
	<div>
    

    <myMultiselect v-bind:options="users" :label="'username'" />

    <mySingleselect v-bind:options="users" :label="'username'" :customlabel="nameUser" />

    <myAsyncsearch v-bind:options="users" :label="'username'" :asyncFunc="asyncFunc" />
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapGetters} from 'vuex'
import myMultiselect from '@/components/multiselect'
import mySingleselect from '@/components/singleselect'
import myAsyncsearch from '@/components/asyncSearch'
export default {

  name: 'UserList',
  data () {
    return {
      // filter_list : [],
      search: "",
      value: null,
      values: [],
      async_users: [],
      is_loading: false,
      selected_values : [],
    }
  },
  components: {
    Multiselect,
    myMultiselect, 
    mySingleselect,
    myAsyncsearch,
  },
  methods:{      
      goBack: function(){
          this.$router.go(-1);
      },
      nameUser: function(user){
        return `${user.username}`
      },
      asyncFunc: function(query){
        return this.$store.dispatch('user/fetchUsers', query)
      }
  },
  mounted: function (){
    this.$store.dispatch('user/fetchUsers')
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    })
  }
}
</script>

<style lang="css" scoped>
</style>


