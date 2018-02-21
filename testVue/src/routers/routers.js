import vue from 'vue'
import Router from 'vue-router'
import TravelList from '../components/TravelList.vue'
import PlaceList from '../components/PlaceList.vue'
import PlaceForm from '../components/PlaceForm.vue'
import TimeSpanList from '../components/TimeSpanList.vue'
import TravelForm from '../components/TravelForm.vue'
import Travel from '../components/Travel.vue'
import Place from '../components/Place.vue'
// import Timespan from '../components/Timespan.vue'
// import TimespanForm from '../components/TimespanForm.vue'
import Login from '../components/login.vue'
import UserForm from '../components/UserForm.vue'
import UserView from '../components/UserView.vue'
import TravelView from '../components/UserViewTravel.vue'
import UserInfo from '../components/UserInfo.vue'
import ActivityForm from '../components/ActivityForm.vue'
Vue.use(Router)


import {requireAuth} from '../utils/auth'

export default new Router({
    mode: 'history', 
    routes:[
        {
            path:'/', redirect: "/index"
        },
        {
            path:'/travels', name: 'Travels', component: TravelList,
            children: [
                {path: ':id', name: 'Travel', component: Travel}
            ]
        },
        {
            path:'/travels/create', name:'TravelForm', component: TravelForm
        },
        // {
        //     path:'/travels/:id', name: 'Travel', component: Travel
        // },
        {
            path:'/places', name: 'Places', component: PlaceList
        },
        {
            path:'/places/create', name: 'PlaceForm', component: PlaceForm
        },
        // {
        //     path:'/timespans', name: 'Timespans', component: TimeSpanList
        // },
        // {
        //     path:'/timespan', name: 'TimespanForm', component: TimespanForm
        // },
        // {
        //     path:'/timespan/:id', name: 'Timespan', component: Timespan
        // },
        {
            path: '/login', name: 'login', component: Login
        },
        {
            path: '/createuser', name: 'UserForm', component: UserForm
        },
        {
            path: '/index', name: 'UserView', component: UserView,
            beforeEnter: requireAuth
        },
        {
            path: '/travel_view/', name: 'TravelView', component: TravelView, beforeEnter: requireAuth,
            children: [
                {
                    path:'/places/:id', name: 'Place', component: Place
                }
            ]
        },
        {
            path: '/user_info', name: 'UserInfo', component: UserInfo, beforeEnter: requireAuth
        },
        {
            path: 'activity/create', name:'ActivityForm', component: ActivityForm
        }
    ]
})