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
      <div>
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
      </div>

      <div>
        <p v-if="getExpenseSize() !== 0">
          <span>Expenses</span>

            <table v-for="member in travelgroup.membership_set">
              <tr v-if="member.expense_set.length>0">  {{member.user.username}} piad: </tr>
              <tr v-for="expense in member.expense_set">
                <td>{{expense.expense}} to: </td>
                <td v-for="payee in expense.payees">{{payee.username}}</td>
                <td>for {{expense.comment}}</td>
              </tr>
            </table>
        </p>
        <button v-on:click="toggleExpenseShow()" v-on:submit="expense_submit()">Add Expense</button>
        <ExpenseForm v-if="expense_show" v-bind:travel="travelgroup.id"/>
      </div>
    </div>
    <div v-else>
      No Travel found
    </div>
    <div>
      <ul>
        <li v-for="member in travelgroup.membership_set">
          <span v-on:click="checkUser(member.user.id)" >
            <router-link :to="{name: 'UserInfo', params:{id: member.user.id}}" >
              User:  {{member.user.username}}
            </router-link>
          </span>
        </li>
      </ul>
      <MembershipForm v-bind:travel="travelgroup.id"/>
      <div v-on:click="calculateExpense">
        <router-link :to="{name:'Checkout'}">Calculate Overall Expense</router-link>
      </div>
      <!-- <button v-on:click="calculateExpense">Calculate Overall Expense</button> -->
    </div>
    <div>
      <group-chat :group="travelgroup.id" />
    </div>
	</div>
</template>

<script>

import ExpenseForm from '@/components/UIcomponents/ExpenseForm.vue'
import MembershipForm from '@/components/UIcomponents/MembershipForm.vue'
import activity from '@/components/Activity'
import {mapGetters} from 'vuex'
import {printResponse} from '@/utils/helper'
import editable from '@/components/UIcomponents/Editable.vue'
import GroupChat from '@/components/UIcomponents/GroupChat.vue'


export default {

  name: 'TravelView',
  data () {
    return {
        expense_show: false,
        travel_submit_show: false,
    }
  },
  components: {
      MembershipForm,
      ExpenseForm,
      activity,
      editable,
      GroupChat,
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
      getBalance: function(expenses){
        var debts = {}
        var payer
        var payees=[]
        var paid2users
        var paid2user
        var value
        for (let expense of expenses) {
          payer = expense.paid_member
          paid2users = expense.payees
          payees=[]
          for (let paid2user of paid2users) {
            payees.push(paid2user.username)
          }
          var size = payees.length
          var exp = expense.expense
          if (size !== 0 && exp !== 0) {
            value = exp / size
            if (!debts[payer]) {
              debts[payer] = 0
            }
            debts[payer] -= exp
            for (let payee of payees) {
              if (!debts[payee])
                debts[payee] = 0
              debts[payee] += value
            }
          }
        }
        var balance = []
        for(var i in debts){
          //alert(i+ ':' + debts[i])
          if (debts[i] !== 0)
            balance.push([i, debts[i]])
        }
        return balance
      },
      calculateExpense: function(){
          var expenses = []
          for (let member of this.travelgroup.membership_set) {
            for (let expense of member.expense_set) {
              expense.paid_member = member.user.username
            }
            expenses = expenses.concat(member.expense_set)
          }
          var balance = this.getBalance(expenses)
          this.$store.dispatch('expense/calculateUserpay', balance)
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
      },
      getExpenseSize: function(){
        var size = 0
        for (var i = 0; i < this.travelgroup.membership_set.length; i++) {
          size += this.travelgroup.membership_set[i].expense_set.length
        }
        return size
      }
  },
  mounted: function(){
    this.$store.dispatch('groupTravel/fetchTravelGroup', {id: this.$route.params.id}).then(
      ()=> {
          var member
          var uid = localStorage.getItem('tWeb_userId');
          for (var i = 0; i < this.travelgroup.membership_set.length; i++) {
            member = this.travelgroup.membership_set[i]
            if (member.user.id == uid) {
              this.$store.dispatch('membership/setLocalMembership', member)
              break
            }
          }
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
        user_id: 'user/getId',
        member: 'membership/getMembership',
        travelgroup: 'groupTravel/getTravelGroup',
        activities: 'activity/getActivities'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
