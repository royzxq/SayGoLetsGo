<template>
<div>
<div v-for="(value, key) in user_pay">
  User {{key}} should pay {{value}}
</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  name: 'Checkout',
  data() {
    return {
      expense_avg: 0,
      user_pay: {},
    }
  },
  methods:{
    calculateAvgExpense: function(){
        var expense_list = []
        let expense_sum = 0
        console.log("activities")
        console.log(this.activities)
        for (let activity of this.activities){
          for(let expense of activity.expense_activity){
            console.log(expense)
            expense_sum += expense.expense
          }
          
        }
        this.expense_avg = expense_sum / this.group.users.length
      },
    checkout: function(){
      this.calculateAvgExpense()
      console.log("group")
      console.log(this.group)
      console.log(this.user_pay)
      for (let user of this.group.users){
        console.log(user)
        // if (!user in this.user_pay){
          this.user_pay[user] = this.expense_avg
        // }
      }
      for (let activity of this.activities){
        for(let expense of activity.expense_activity){
          if(expense.user in this.user_pay){
            this.user_pay[expense.user] -= expense.expense
          }
        }
      }
      console.log(this.user_pay)
    }
  },
  computed: {
    ...mapGetters({
      activities: 'activity/getActivities',
      group: 'groupTravel/getGroup'
    }),
    
  },
  mounted: function (){
    this.checkout();
  }
}
</script>

<style lang="css" scoped>
</style>
