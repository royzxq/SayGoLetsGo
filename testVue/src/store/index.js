import VueX from 'vuex'
import Vue from 'vue'
import placeModule from './modules/place'
import groupTravelModule from './modules/group_travel'
import userModule from './modules/user'
import acicityModule from './modules/activity'
import expenseModule from './modules/expense'
Vue.use(VueX)


export default new VueX.Store({
    modules: {
        place: placeModule,
        groupTravel: groupTravelModule,
        user: userModule,
        activity: acicityModule,
        expense: expenseModule,
    },
})