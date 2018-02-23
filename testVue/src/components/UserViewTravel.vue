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

            <span>Activities</span>
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
                <router-view></router-view>
            </ul>
        </div>
        <div v-else>
            No Travel found
        </div>
        <div>
            <ul>
                
                <li v-for="user in group.users">
                    <router-link :to="{name: 'UserInfo', params: {id: user}}" >
                        User:  {{user}}
                    </router-link>
                </li>
            </ul>
            <button type="submit"> Add Users</button>
        </div>
        <!-- <router-view></router-view> -->
	</div>
</template>

<script>

import {getTravels, getGroup, getActivities} from '../utils/requests'
import ExpenseForm from '../components/ExpenseForm.vue'
import {mapGetters} from 'vuex'
export default {

  name: 'TravelView',
  data () {
    return {
        travel: null,
        group: null,
        activities: null,
        expense_show: []
    }
  },
  components: {
      ExpenseForm
  },
  methods:{
      getGroupTravel: function () {
        // this.group = this.$route.params.group 
        var param = {
            group: this.$route.params.group_id
        }
        getGroup(this.$route.params.group_id).then(response => {
            this.group = response.data
            getTravels(param).then(response => {
                this.travel = response.data.results[0];
                var param = {
                    travel : this.travel.id
                }
                getActivities(param).then(response => {
                    this.activities = response.data.results
                    this.expense_show = Array(this.activities.length).fill(false)
                    console.log(response.data.results)
                }).catch(error => {
                    console.log("get activity failed " + this.travel.id + error);
                    alert(error.response)
                })
            }).catch(error => {
                console.log("get travel failed")
                alert(error)
            })
        }).catch(error => {
            console.log("get group failed" + this.$route.params.group_id);
            alert(error)
        })

        // getTravelList(param).then(response => {
        //     // console.log(response.data.results)
        //   this.travel = response.data.results[0]
        // }).catch(err => {    
        //   alert(err.response)
        // })
      },
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
      }
  },
  mounted: function(){
      this.getGroupTravel();
  },
  computed: {
    empty: function(){
      return this.travel === null;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
