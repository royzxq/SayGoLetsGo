import Vue from 'vue'
import App from './App.vue'
import TravelList from './components/TravelList.vue'
import PlaceList from './components/PlaceList.vue'
import Travel from './components/Travel.vue'
import Place from './components/Place.vue'
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
    path:'/travel',
    name:'Travel',
    component: Travel
  },
  {
    path:'/place',
    name: 'Place',
    component: Place
  },
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
