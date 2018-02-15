<template>
	<div>
        <div v-if="travel!==null">
            <p>
                Title:  {{travel.title}}
            </p>
            <p> Days: {{travel.days}} </p>
            <p> Country: {{travel.country}} </p>
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
        </div>
	</div>
</template>

<script>

import {getTravelList} from '../utils/requests'

export default {

  name: 'TravelView',
  data () {
    return {
        travel: null,
        group: null,
    }
  },
  methods:{
      getTravel: function () {
        this.group = this.$route.params.group 
        var param = {
            group: this.group.id
        }
        getTravelList(param).then(response => {
            // console.log(response.data.results)
          this.travel = response.data.results[0]
        }).catch(err => {
          alert(err.response)
        })
      }
  },
  mounted: function(){
      this.getTravel();
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
