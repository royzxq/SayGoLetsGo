

import {getGroups, getGroup, createGroup, getTravel, getTravels, createTravel, getTravelGroup, getTravelGroups, createTravelGroup} from '../../../utils/requests'
import {printResponse} from '@/utils/helper'
const state = {
    group: null,
    id: null,
    groups: [],
    travel: null,
    travels: [],
    travel_groups: [],
    travel_group: null,
}

const getters = {
    getGroup: (state) => state.group,
    getGroups: state => state.groups,
    getId: state => state.id,
    getTravel: state => state.travel,
    getTravels: state => state.travels,
    getTravelGroup: state=> state.travel_group,
    getTravelGroups: state => state.travel_groups
}

const mutations = {
    setGroup: (state, payload) => {
        console.log("set group")
        console.log(payload)
        state.group_id = payload.id
        state.group = payload
    },
    setGroups: (state, payload) => {
        state.groups = payload
    },
    deleteGroup: (state) => {
        state.group = null
        state.group_id = null
    },
    deleteGroups: state => {
        state.groups = []
    },
    setId: (state, id) => {
        state.id = id
    },
    setTravel: (state, payload) => {
        console.log("set travel")
        console.log(payload)
        state.travel = payload
    },
    setTravels: (state, payload) => {
        state.travels = payload
    },
    deleteTravel: state => {
        state.travel = null
    },
    deleteTravels: state => {
        state.travels = []
    },
    setTravelGroup: (state, payload) => {
      state.travel_group = payload
    },
    setTravelGroups: (state, payload) => {
      state.travel_groups = payload
    },
}

const actions = {
    fetchGroup: (context, payload=null) => {
        if (payload !== null){
            context.commit('setId', payload.id)
        }
        if ( state.group !== null && state.id === state.group.id){
            return ;
        }
        getGroup(state.id).then(response => {
            console.log("fetch the group");
            console.log(response.data)
            context.commit("setGroup", response.data)
        }).catch(error => {
            console.log("fetch the place failed " + state.id)
            context.commit("deleteGroup")
        })
    },
    fetchGroups: (context, payload=null) => {
        getGroups(payload).then(response => {
            context.commit('setGroups', response.data.results)
        }).catch(error => {
            console.log("fetch the groups failed ")
        })
    },
    fetchTravelGroups: (context, payload=null) => {
      return getTravelGroups(payload).then(response => {
        printResponse("fetchTravelGroups ", response.data.results)
        context.commit('setTravelGroups', response.data.results)
      })
    },
    fetchTravelGroup: (context, payload) => {
      return getTravelGroup(payload.id).then(response => {
        printResponse("fetchTravelGroup", response.data)
        context.commit('setTravelGroup', response.data)
      })
    },
    createTravelGroup: (context, payload) => {
      return createTravelGroup(payload).then(response => {
        printResponse("createTravelGroup", response.data)
        context.commit('setTravelGroup', response.data)
      })
    },
    createGroupAndTravel: (context, payload) => { 
        return createGroup(payload.group).then(response => {
                console.log("create the group");
                console.log(response.data)
                context.commit('setId', response.data.id)
                context.commit("setGroup", response.data)
                payload.travel.group = response.data.id
                return createTravel(payload.travel).then(response => {
                    console.log("create the travel");
                    console.log(response.data);
                    context.commit('setTravel', response.data)
                })
            }).then(response => {
                console.log("all done")
                return response
            })
        
    },
    setId: (context, id) => {
        context.commit('setId', id)
        getTravelGroup(state.id).then(response => {
            printResponse("getTravelGroup", response.data)
            context.commit("setTravelGroup", response.data)
        }).catch(error => {
            console.log("getTravelGroup failed " + state.id)
            // context.commit("deleteGroup")
        })
        // var param = {
        //     group : id
        // }
        // getTravels(param).then(response => {
        //     console.log("fetch the travel");
        //     context.commit("setTravel", response.data.results[0])
        // }).catch(error => {
        //     console.log("fetch the travel failed")
        // })
    },
    fetchTravels: (context, payload=null) => {
        getTravels(payload).then(reponse => {
            context.commit('setTravels', response.data.results)
        }).catch(error => {
            console.log("fetch the travels failed ")
            // context.commit("deleteTravels")
        })
    },
    fetchTravel: (context, payload=null) => {
        getGroup(payload.id).then(response => {
            console.log("fetch the travel");
            console.log(response.data)
            context.commit("setTravel", response.data)
        }).catch(error => {
            console.log("fetch the travel failed " + payload.id)
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