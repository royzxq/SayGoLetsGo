<template>
	<div>
	<input v-model="expense" placeholder="What is the activity">
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {createExpense} from '../utils/requests'
export default {
  name: 'ExpenseForm',
  data: function () {return {
        expense: 0.0
  	}
  },
  props: [
      'activity_id'
  ],
//   props: ['travel_id'],
  methods:{
  	submit: function(){
        var obj = {}
        obj.expense = this.expense
        obj.expense_activity = activity_id
        createExpense(obj).then(response => {
            console.log(response.data)
            // this.$router.push('/index')
        }).catch(error => {
            console.log('created expense failed')
            console.log(error)
        })
		
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
