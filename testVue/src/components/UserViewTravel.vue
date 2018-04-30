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
          <span v-on:click="checkUser(member.user)" >
            <router-link :to="{name: 'UserInfo'}" >
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
	</div>
</template>

<script>

import ExpenseForm from '@/components/ExpenseForm.vue'
import MembershipForm from '@/components/MembershipForm.vue'
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
      MembershipForm,
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
       // alert(this.travelgroup.users)
          payload.expenses = []
          var member
          for (let member of this.travelgroup.membership_set)
          alert(member.id)
            //this.travelgroup.expense_set
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
