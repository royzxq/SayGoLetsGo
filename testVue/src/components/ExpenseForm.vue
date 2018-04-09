<template>
	<div v-if="show">
    <label >how much did you pay?</label>
	<input v-model.number="expense"  type="number" placeholder="how much did you pay?" />
  <myMultiselect :options="users" :label="'username'" />
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {printResponse} from "@/utils/helper"
import myMultiselect from '@/components/multiselect'
import {mapGetters} from 'vuex'

export default {
  name: 'ExpenseForm',
  data: function () {return {
        expense: 0.0,
        show: true,
  	}
  },
  props: [
    'travel',
  ],
  components: {
    myMultiselect
  },
  methods:{
  	submit: function(){
        var obj = {}
        obj.expense = this.expense
        obj.payee = []
        for(let user of this.values){
          obj.payee.push(user.id)
        }
        obj.travel = this.travel
        this.$store.dispatch('expense/createExpense', obj).then(()=>{
          this.$emit('submit')
          this.$router.go(-1)
        }).catch(error => {
          printResponse("create expense failed", error)
        })
  	}
  },
  mounted() {
    var obj = {
      travelgroup: this.travel
    }
    this.$store.dispatch('user/fetchUsers', obj)
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      values: 'options/getValues'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
