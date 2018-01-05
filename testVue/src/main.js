import Vue from 'vue'
import App from './App.vue'
import TravelList from './components/TravelList.vue'
import PlaceList from './components/PlaceList.vue'
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
