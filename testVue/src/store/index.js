import VueX from 'vuex'
import Vue from 'vue'
import placeModule from './modules/place'
import groupTravelModule from './modules/group_travel'
Vue.use(VueX)


export default new VueX.Store({
    modules: {
        place: placeModule,
        groupTravel: groupTravelModule,
    },
})