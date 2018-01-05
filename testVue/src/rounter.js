import TravelList from './components/TravelList.vue'
import PlaceList from './components/PlaceList.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new Router({
  routes:[
  {
    path:'/travels',
    name: 'Travels',
    component: TravelList
  }
  ]
})