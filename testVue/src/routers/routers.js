import vue from 'vue'
import Router from 'vue-router'
import PlaceList from '../components/PlaceList.vue'
import PlaceForm from '../components/PlaceForm.vue'
import TravelForm from '../components/TravelForm.vue'
import Place from '../components/Place.vue'
import Login from '../components/Login.vue'
import UserForm from '../components/UserForm.vue'
import UserView from '../components/UserView.vue'
import TravelView from '../components/UserViewTravel.vue'
import UserInfo from '../components/UserInfo.vue'
import ActivityForm from '../components/ActivityForm.vue'
import ExpenseForm from '../components/UIcomponents/ExpenseForm.vue'
import Checkout from '@/components/Checkout.vue'
Vue.use(Router)


import {requireAuth} from '../utils/auth'

export default new Router({
    mode: 'history', 
    routes:[
        {
            path:'/', redirect: "/index"
        },
        {
            path:'/travels/create', name:'TravelForm', component: TravelForm
        },
        {
            path:'/places', name: 'Places', component: PlaceList
        },
        {
            path:'/places/create', name: 'PlaceForm', component: PlaceForm
        },
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
            path: '/travel_view/:id', name: 'TravelView', component: TravelView, beforeEnter: requireAuth,
            children: [
                {
                    path:'places', name: 'Place', component: Place
                },
                {
                    path: 'expense', name: 'Expense', component: ExpenseForm
                },
                {
                    path: 'checkout', name: 'Checkout', component: Checkout  
                },
                {
                  path: '/activity/create', name:'ActivityForm', component: ActivityForm
                }
            ]
        },
        {
            path: '/user_info/:id', name: 'UserInfo', component: UserInfo, beforeEnter: requireAuth
        },
        
    ]
})