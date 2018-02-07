<template>
  <div id="app">
    <router-link :to="{name: 'Travels'}"> Travels</router-link>
    <router-link :to="{name: 'Places'}"> Places</router-link>
    <router-link :to="{name: 'Timespans'}"> Timespans</router-link>
    <router-link :to="{name: 'login'}"> login</router-link>
    <router-view></router-view>
    <!-- <travel-list  ></travel-list> -->
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script>
import VueResources from 'vue-resource'
import TravelList from './components/TravelList.vue'
import PlaceList from './components/PlaceList.vue'
import TimeSpanList from './components/TimeSpanList.vue'
import login from './components/login.vue'

export default {
  name: 'App',
  // router,
  components: {
   // TravelList,
    //PlaceList,
    //TimeSpanList,
    //login
  }
}
</script>

<style lang="css" scoped>
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
