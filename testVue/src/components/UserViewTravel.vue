<template>
	<div>
        <button v-on:click="goBack">Go Back</button>
        <div v-if="travelgroup!==null">
          <div @click="show_submit()">
          <label> Title: </label>
          <editable :content="travelgroup.title" @update="travelgroup.title=$event" />
          <label> Days: </label>
          <editable :content="travelgroup.days" @update="travelgroup.days=$event" />
          <label> Country: </label>
          <editable :content="travelgroup.country" @update="travelgroup.country=$event" />
          <div v-if="travel_submit_show">
            <button @click="submit()">Submit change</button>
          </div>
          </div>
            <br>
            <br>
            <span>Activities</span>
            <ul>
                <li v-for="(activity,idx) in activities">
                    <activity v-bind:activity="activity" @checkPlace="checkPlace($event)" />
                </li>
                <br>  
                <router-link :to="{name:'ActivityForm', params: {travel: travelgroup.id}}">Add Activity</router-link>
                <br><br>
                <router-view></router-view>
            </ul>

            
            <p v-if="travelgroup.expense_set.length !== 0">
              <span>Expenses</span>
            <ul>
                <li v-for="expense in travelgroup.expense_set">
                    User {{expense.payer_id}} paid 
                    Expense: {{expense.expense}} to 
                    <p v-for="payee in expense.payee">
                      {{payee.username}} 
                      <br>
                    </p>
                </li>
                </ul>
            </p>
            <button v-on:click="toggleExpenseShow()" v-on:submit="expense_submit()">Add Expense</button>
            <ExpenseForm v-if="expense_show" v-bind:travel="travelgroup.id"/>
        </div>
        <div v-else>
            No Travel found
        </div>
        <div>
            <ul>
                
                <li v-for="user in travelgroup.users">
                    <span v-on:click="checkUser(user)" >
                    <router-link :to="{name: 'UserInfo'}" >
                        User:  {{user}}
                    </router-link>
                    </span>
                </li>
            </ul>
            <button type="submit"> Add Users</button>
            <div v-on:click="calculateExpense">
            <router-link :to="{name:'Checkout'}">Calculate Overall Expense</router-link>
            </div>
            <!-- <button v-on:click="calculateExpense">Calculate Overall Expense</button> -->
        </div>
	</div>
</template>

<script>

import ExpenseForm from '@/components/ExpenseForm.vue'
import activity from '@/components/Activity'
import {mapGetters} from 'vuex'
import {printResponse} from '@/utils/helper'
import editable from '@/components/Editable.vue'

export default {

  name: 'TravelView',
  data () {
    return {
        expense_show: false,
        travel_submit_show: false,
    }
  },
  components: {
      ExpenseForm,
      activity,
      editable,
  },
  methods:{
      toggleExpenseShow: function(){
          this.expense_show = !this.expense_show
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
              travel: this.travelgroup.id
          }
          this.$store.dispatch('activity/fetchActivities', travel_info)
      },
      calculateExpense: function(){
          var payload = {}
          payload.users = this.travelgroup.users
          payload.expenses = this.travelgroup.expense_set
          this.$store.dispatch('expense/calculateUserpay', payload)
      },
      expense_submit(){
        this.expense_show = false;
      },
      submit: function(){
        var travelgroup = this.travelgroup
        this.$store.dispatch('groupTravel/updateTravelGroup', travelgroup).then(()=>{
          this.travel_submit_show = false;
        }).catch(error => {
          printResponse("update travelgroup failed", error)
        })
      },
      show_submit: function(){
        this.travel_submit_show = true
      }
  },
  mounted: function(){
    this.$store.dispatch('groupTravel/fetchTravelGroup', {id: this.$route.params.id}).then(
      ()=>{

      }
    ).catch(error => {
      printResponse("fetch the travel failed", error);
    })
    
    this.$store.dispatch('activity/fetchActivities', {travel: this.$route.params.id})
    
      this.expense_show = Array(100).fill(false)
  },
  computed: {
    empty: function(){
      return this.travel === null;
    },
    ...mapGetters({
        travelgroup: 'groupTravel/getTravelGroup',
        activities: 'activity/getActivities'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
