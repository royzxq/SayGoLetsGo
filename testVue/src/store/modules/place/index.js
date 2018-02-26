

import {getPlace, createPlace} from '../../../utils/requests'

const state = {
    place: null,
    id: null,
    // places: []
}

const getters = {
    getPlace: (state) => state.place,
    getId: state => state.id
}

const mutations = {
    setPlace: (state, payload) => {
        console.log("add place")
        console.log(payload)
        state.id = payload.id
        state.place = payload
    },
    deletePlace: (state) => {
        state.place = null
        state.id = null
    },
    setId: (state, id) => {
        state.id = id
    }
    
}

const actions = {
    fetchPlace: (context, payload=null) => {
        if (payload !== null){
            context.commit('setId', payload.id)
        }
        if ( state.place !== null && state.id === state.place.id){
            return ;
        }
        getPlace(state.id).then(response => {
            console.log("fetch the place");
            console.log(response.data)
            context.commit("setPlace", response.data)
        }).catch(error => {
            console.log("fetch the place failed " + state.id)
            context.commit("deletePlace")
        })
    },
    createPlace: (context, payload) => {
        createPlace(payload.place).then(response => {
            console.log("create the place");
            console.log(response.data)
            context.commit('setId', response.data.id)
            context.commit("setPlace", response.data)
        }).catch(error => {
            console.log("create the place failed ")
            context.commit("deletePlace")
        })
    },
    setId: (context, id) => {
        context.commit('setId', id)
        getPlace(state.id).then(response => {
            console.log("fetch the place");
            console.log(response.data)
            context.commit("setPlace", response.data)
        }).catch(error => {
            console.log("fetch the place failed " + state.id)
            context.commit("deletePlace")
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};