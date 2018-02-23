

import {getGroups, getGroup, createGroup, getTravel, getTravels, createTravel,} from '../../../utils/requests'

const state = {
    group: null,
    group_id: null,
    groups: [],
    travel: null,
    travels: [],
}

const getters = {
    getGroup: (state) => state.group,
    getGroups: state => state.groups,
    getId: state => state.group_id,
    getTravel: state => state.travel,
    getTravels: state => state.travels
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
        state.group_id = id
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
    }
}

const actions = {
    fetchGroup: (context, payload=null) => {
        if (payload !== null){
            context.commit('setId', payload.id)
        }
        if ( state.place !== null && state.id === state.place.id){
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
    createGroupAndTravel: (context, payload) => { 
        createGroup(payload.group).then(response => {
            console.log("create the group");
            console.log(response.data)
            context.commit('setId', response.data.id)
            context.commit("setGroup", response.data)
            payload.travel.group = response.data.id
            createTravel(payload.travel).then(response => {
                console.log("create the travel");
                console.log(response.data);
                context.commit('setTravel', response.data)
            }).catch(error => {
                console.log("create the travel failed ")
                // context.commit("deleteGroup")
            })
        }).catch(error => {
            console.log("create the group failed ")
            // context.commit("deleteGroup")
        })
    },
    setId: (context, id) => {
        context.commit('setId', id)
        getGroup(state.id).then(response => {
            console.log("fetch the group");
            console.log(response.data)
            context.commit("setGroup", response.data)
        }).catch(error => {
            console.log("fetch the group failed " + state.id)
            context.commit("deleteGroup")
        })
        var param = {
            group : id
        }
        getTravels(param).then(response => {
            console.log("fetch the travel");
            context.commit("setTravel", response.data.results[0])
        }).catch(error => {
            console.log("fetch the travel failed")
        })
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