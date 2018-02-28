<template>
	<div v-if="show">
	<input v-model="expense" placeholder="What is the activity">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {createExpense} from '../utils/requests'
import {printResponse} from "@/utils/helper"
export default {
  name: 'ExpenseForm',
  data: function () {return {
        expense: 0.0,
        show: true,
  	}
  },
  methods:{
  	submit: function(){
        var obj = {}
        obj.expense = this.expense
        this.$store.dispatch('expense/createExpense', obj).then(()=>{
          this.show = false;
        }).catch(error => {
          printResponse("create expense failed", error)
        })
        // createExpense(obj).then(response => {
        //     console.log(response.data)
        //     // this.$router.push('/index')
        // }).catch(error => {
        //     console.log('created expense failed')
        //     console.log(error)
        // })
		
  	}
  },
  mounted: {
    show () {
      return true;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
