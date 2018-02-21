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
                <li v-for="activity in activities">
                    <p>Activity: {{activity.activity}}</p>
                    <p>Start time: {{ activity.start_time }} </p>
                    <p v-if="activity.place!==null">
                        <router-link :to="{name:'Place', params:{id: activity.place.id}}">Check Place</router-link>
                        Place: {{ activity.place.name }}
                        

                    </p>
                    <p v-if="activity.expense_activity.length !== 0">
                        <ul>
                            <li v-for="expense in activity.expense_activity">
                                User {{expense.user}} paid 
                                Expense: {{expense.expense}}
                            </li>
                        </ul>
                    </p>
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

import {getTravelList, getGroup, getActivities} from '../utils/requests'

export default {

  name: 'TravelView',
  data () {
    return {
        travel: null,
        group: null,
        activities: null
    }
  },
  methods:{
      getGroupTravel: function () {
        // this.group = this.$route.params.group 
        var param = {
            group: this.$route.params.group_id
        }
        getGroup(this.$route.params.group_id).then(response => {
            this.group = response.data
            getTravelList(param).then(response => {
                this.travel = response.data.results[0];
                var param = {
                    travel : this.travel.id
                }
                getActivities(param).then(response => {
                    this.activities = response.data.results
                    console.log(response.data.results)
                }).catch(error => {
                    console.log("get activity failed " + this.travel.id + error);
                    alert(error.response)
                })
            }).catch(error => {
                console.log("get travel failed")
                alert(error.response)
            })
        }).catch(error => {
            console.log("get group failed" + this.$route.params.group_id);
            alert(error.response)
        })

        // getTravelList(param).then(response => {
        //     // console.log(response.data.results)
        //   this.travel = response.data.results[0]
        // }).catch(err => {
        //   alert(err.response)
        // })
      },
    //   getActivities: function (){
    //       var param = {
    //           travel : this.travel.id
    //       }
    //       getActivities(param).then(response => {
    //           this.activities = response.data.results
    //           console.log(response.data.results)
    //       }).catch(error => {
    //           console.log("get activity failed" + this.travel.id);
    //           alert(error.response)
    //       })
    //   },
      goBack: function(){
        //   alert("go back");
          this.$router.go(-1);
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
