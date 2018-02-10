import Vue from 'vue'
import App from './App.vue'
import TravelList from './components/TravelList.vue'
import PlaceList from './components/PlaceList.vue'
import TimeSpanList from './components/TimeSpanList.vue'
import TravelForm from './components/TravelForm.vue'
import Travel from './components/Travel.vue'
import Place from './components/Place.vue'
import Timespan from './components/Timespan.vue'
import TimespanForm from './components/TimespanForm.vue'
import Login from './components/login.vue'
import Router from 'vue-router'
Vue.use(Router)
import VueResources from 'vue-resource'
Vue.use(VueResources)

var router = new Router({
  mode: 'history', 
  routes:[
  {
    path:'/travels', name: 'Travels', component: TravelList,
  },
  {
    path:'/travels/create', name:'TravelForm', component: TravelForm
  },
  {
    path:'/travels/:id', name: 'Travel', component: Travel
  },
  {
    path:'/places', name: 'Places', component: PlaceList
  },
  {
    path:'/places/:id', name: 'Place', component: Place
  },
  {
    path:'/timespans', name: 'Timespans', component: TimeSpanList
  },
  {
    path:'/timespan', name: 'TimespanForm', component: TimespanForm
  },
  {
    path:'/timespan/:id', name: 'Timespan', component: Timespan
  },
  {
    path: 'login', name: 'login', component: Login
  }
  ]
})


// Vue.component(App)

new Vue({
  el: '#app',
  router,
  components: {App},
  data: {
    message: "default"
  }
})
