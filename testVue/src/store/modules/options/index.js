

import {printResponse, checkField} from '@/utils/helper'

const state = {
    values: [], // for multi select
    value: {}, // to support multiple single select in one components
}

const getters = {
    getValues: (state) => state.values,
    getValue(state) {
      return (id) => {
        return state.value[id]
      }
    },
}

const mutations = {
    setValues: (state, payload) => {
      if(Array.isArray(payload)){
        state.values = payload
      }
      else{
        state.values = []
        state.values.push(payload)
      }
    },
    deleteValues: (state) => {
      state.value = null
      state.values = []
    },
    setValue: (state, payload) => {      
      state.value[payload.id] = payload.value
    }    
}

const actions = {
    SetValues: (context, payload) => {
      console.log(payload)
      context.commit('setValues', payload)
    },
    SetValue: (context, payload) => {
      console.log(payload)
      context.commit('setValue', payload)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};