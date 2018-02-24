<template>
	<div>
        <button v-on:click="goBack">Go Back</button>
        <div v-if="travel!==null">
            <p>
                Title:  {{travel.title}}
            </p>
            <p> Days: {{travel.days}} </p>
            <p> Country: {{travel.country}} </p>
            <br>
            <br>
            <span>Activities</span>
            <button v-on:click="getActivities()">Show Activities</button>
            <ul>
                <li v-for="(activity,idx) in activities">
                    <p>Activity: {{activity.activity}}</p>
                    <p>Start time: {{ activity.start_time }} </p>
                    <p v-if="activity.place!==null">
                        <span v-on:click="checkPlace(activity.place.id)"> 
                        <router-link :to="{name:'Place'}" >Check Place</router-link>
                            Place: {{ activity.place.name }}
                        </span>
                    </p>
                    <p v-if="activity.expense_activity.length !== 0">
                        <ul>
                            <li v-for="expense in activity.expense_activity">
                                User {{expense.user}} paid 
                                Expense: {{expense.expense}}
                            </li>
                        </ul>
                    </p>
                    <button v-on:click="toggleExpenseShow(idx)">Add Expense</button>
                    <!-- <router-link :to="{name: 'Expense', params:{activity_id: activity.id}}">Add Expense</router-link> -->
                    <!-- <router-view></router-view> -->
                    <ExpenseForm v-if="expense_show[idx]" v-bind:activity_id="activity.id"/>
                </li>
                <br>
                
                <router-link :to="{name:'ActivityForm', params: {travel: travel.id}}">Add Activity</router-link>
                <br>
                <br>
                <router-view></router-view>
            </ul>
        </div>
        <div v-else>
            No Travel found
        </div>
        <div>
            <ul>
                
                <li v-for="user in group.users">
                    <span v-on:click="checkUser(user)" >
                    <router-link :to="{name: 'UserInfo'}" >
                        User:  {{user}}
                    </router-link>
                    </span>
                </li>
            </ul>
            <button type="submit"> Add Users</button>
            <router-link :to="{name:'Checkout'}">Calculate Overall Expense</router-link>
            <!-- <button v-on:click="calculateExpense">Calculate Overall Expense</button> -->
        </div>
	</div>
</template>

<script>

import {getTravels, getGroup, getActivities, getTravel} from '../utils/requests'
import ExpenseForm from '../components/ExpenseForm.vue'
import {mapGetters} from 'vuex'
export default {

  name: 'TravelView',
  data () {
    return {
        expense_show: []
    }
  },
  components: {
      ExpenseForm
  },
  methods:{
      toggleExpenseShow: function(idx){
          var value = !this.expense_show[idx]
          this.$set(this.expense_show, idx, value)
          console.log(this.expense_show)
      },
      goBack: function(){
        //   alert("go back");
          this.$router.go(-1);
      },
      checkPlace: function(id) {
          this.$store.dispatch('place/setId', id)
      },
      checkUser: function(id){
          this.$store.dispatch('user/setId', id)
      },
      getActivities: function(){
          var travel_info = {
              travel: this.travel.id
          }
          this.$store.dispatch('activity/fetchActivities', travel_info)
      },
      calculateExpense: function(){
        var expense_list = []
        let expense_sum = 0
        console.log(this.activities)
        for (let activity of this.activities){
          for(let expense of activity.expense_activity){
            console.log(expense)
            expense_sum += expense.expense
          }
          
        }
        let expense_avg = expense_sum / this.activities.length
        console.log(expense_avg)
      }
  },
  mounted: function(){
    //   var travel = {
    //       travel: this.travel.id
    //   }
    //   this.$store.dispatch('activity/fetchActivities', travel)
      this.expense_show = Array(100).fill(false)
  },
  computed: {
    empty: function(){
      return this.travel === null;
    },
    ...mapGetters({
        travel: 'groupTravel/getTravel',
        group: 'groupTravel/getGroup',
        activities: 'activity/getActivities'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
