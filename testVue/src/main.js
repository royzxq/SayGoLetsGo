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
import login from './components/login.vue'
import Router from 'vue-router'
Vue.use(Router)
import VueResources from 'vue-resource'
Vue.use(VueResources)

var router = new Router({
  routes:[
  {
    path:'/travels',
    name: 'Travels',
    component: TravelList
  },
  {
    path:'/places',
    name: 'Places',
    component: PlaceList
  },
  {
    path:'/timespans',
    name: 'Timespans',
    component: TimeSpanList
  },
  {
    path:'/travel',
    name:'TravelForm',
    component: TravelForm
  },
  {
    path:'/travel/:id',
    name: 'Travel',
    component: Travel
  },
  {
    path:'/place',
    name: 'Place',
    component: Place
  },
  {
    path:'/timespan',
    name: 'TimespanForm',
    component: TimespanForm
  },
  {
    path:'/timespan/:id',
    name: 'Timespan',
    component: Timespan
  },
  {
    path: 'login',
    name: 'login',
    component: login
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
