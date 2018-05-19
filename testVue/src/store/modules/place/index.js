

import {getPlace, createPlace, getPlaces, updatePlace, partialUpdatePlace, deletePlace} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'
const state = {
    place: null,
    id: null,
    places: []
}

const getters = {
    getPlace: (state) => state.place,
    getId: state => state.id,
    getPlaces: state => state.places,
}

const mutations = {
    setPlace: (state, payload) => {
        state.id = payload.id
        state.place = payload
    },
    deletePlace: (state) => {
        state.place = null
        state.id = null
    },
    setId: (state, id) => {
        state.id = id
    },
    setPlaces: (state, payload) => {
      state.places = payload
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
            printResponse("getPlace", response.data)
            context.commit("setPlace", response.data)
        }).catch(error => {
            console.log("fetch the place failed " + state.id)
            context.commit("deletePlace")
        })
    },
    createPlace: (context, payload) => {
      console.log(payload);
        return createPlace(payload).then(response => {
            printResponse("createPlace", response.data)
            context.commit("setPlace", response.data)
        })
    },
    setId: (context, id) => {
        context.commit('setId', id)
        getPlace(state.id).then(response => {            
            printResponse("setPlace", response.data)
            context.commit("setPlace", response.data)
        }).catch(error => {
            console.log("fetch the place failed " + state.id)
            context.commit("deletePlace")
        })
    },
    fetchPlaces: (context, payload=null) => {
      getPlaces(payload).then(response => {
        printResponse("fetchPlaces", response.data.results)
        context.commit('setPlaces', response.data.results)
      }).catch(error => {
        console.log("fetchPlaces failed " + payload)
        console.log(error)
      })
    },
    updatePlace: (context, payload) => {
      var target = ['id', 'name', 'description', 'location', 'country', 'city', 'user', 'is_public']
      if(checkField(target, payload)){
        return updatePlace(payload).then(response => {
          context.commit('setPlace', response.data)
        })
      }
      else{
        return partialUpdatePlace(payload).then(response => {
          context.commit('setPlace', response.data)
        })
      }
    },
    deletePlace: (context, id) => {
      return deletePlace(id).then(response => {
        context.commit('deletePlace')
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