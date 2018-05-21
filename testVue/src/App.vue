<template>
  <div id="app">
    <div v-if="is_logged()">
      <button v-on:click="logout">Log out</button>
      <button v-on:click="home">Home</button>
    </div>
    <div v-else>
      <router-link :to="{name: 'UserForm'}">Sign on</router-link>
      <router-link :to="{name: 'login'}"> Log in</router-link>
    </div>
    <router-view></router-view>
    <!-- <travel-list  ></travel-list> -->
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script>
import { is_logged_in, logout } from "./utils/auth";
// import VueResources from 'vue-resource'
// import TravelList from './components/TravelList.vue'
// import PlaceList from './components/PlaceList.vue'
// import TimeSpanList from './components/TimeSpanList.vue'
// import login from './components/login.vue'

export default {
  name: "App",
  // router,
  methods: {
    is_logged: function() {
      return is_logged_in();
    },
    logout: function() {
      logout();
      this.$router.push("/login");
    },
    home: function() {
      this.$router.push("/index");
    }
  }
};
</script>

<style lang="css" scoped>
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
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
