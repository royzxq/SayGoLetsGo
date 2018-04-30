

import { getTravelGroup, getTravelGroups, createTravelGroup, updateTravelGroup, partialUpdateTravelGroup, deleteTravelGroup} from '../../../utils/requests'
import {printResponse, checkField} from '@/utils/helper'
const state = {
    id: null,
    travel_groups: [],
    travel_group: null,
}

const getters = {
    getId: state => state.id,
    getTravelGroup: state=> state.travel_group,
    getTravelGroups: state => state.travel_groups
}

const mutations = {

    deleteTravelGroup: (state) => {
        state.travel_group = null
        state.id = null
    },
    deleteTravelGroups: state => {
        state.travel_groups = []
    },
    setId: (state, id) => {
        state.id = id
    },
    setTravelGroup: (state, payload) => {
      state.travel_group = payload
      state.id = payload.id
    },
    setTravelGroups: (state, payload) => {
      state.travel_groups = payload
    },
}

const actions = {
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
    setId: (context, id) => {
        // context.commit('setId', id)
        getTravelGroup(id).then(response => {
            printResponse("getTravelGroup", response.data)
            context.commit("setTravelGroup", response.data)
        }).catch(error => {
            console.log("getTravelGroup failed " + state.id)
            // context.commit("deleteGroup")
        })
    },
    updateTravelGroup: (context, payload) => {
      var target = ['title', 'is_public', 'country', 'days']
      if(checkField(target, payload)){
        return updateTravelGroup(payload).then(response => {
          context.commit('setTravelGroup', response.data)
        })
      }
      else{
        return partialUpdateTravelGroup(payload).then(response => {
          context.commit('setTravelGroup', response.data)
        })
      }
    },
    deleteTravelGroup: (context, id) => {
      return deleteTravelGroup(id).then(response => {
        context.commit('deleteTravelGroup')
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
