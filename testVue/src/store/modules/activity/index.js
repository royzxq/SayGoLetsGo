

import {getActivities, createActivity} from '@/utils/requests'
import {printResponse} from '@/utils/helper'

const state = {
    activity: null,
    id: null,
    activities: []
}

const getters = {
    getActivity: (state) => state.activity,
    getId: state => state.id,
    getActivities: state => state.activities,
}

const mutations = {
    setActivity: (state, payload) => {
        printResponse("add activity", payload)
        state.id = payload.id
        state.activity = payload
    },
    deleteActivity: (state) => {
        state.activity = null
        state.id = null
    },
    setId: (state, id) => {
        state.id = id
    },
    setActivities: (state, payload) => {
        state.activities = payload
    }
    
}

const actions = {
    fetchActivities: (context, payload=null) => {
        if ( state.activity !== null && state.activity.travel === payload.travel){
            return ;
        }
        getActivities(payload).then(response => {
            printResponse("fetch the acitivities", response.data.results)
            context.commit("setActivities", response.data.results)
            context.commit("setActivity", response.data.results[0])
        }).catch(error => {
            console.log("fetch the activities failed " + payload)
            context.commit("deleteActivity")
        })
    },
    createActivity: (context, payload) => {
        createActivity(payload.activity).then(response => {
            printResponse("create the activity", response.data)
            context.commit('setId', response.data.id)
            context.commit("setActivity", response.data)
        }).catch(error => {
            console.log("create the activity failed ")
            context.commit("deleteActivity")
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};