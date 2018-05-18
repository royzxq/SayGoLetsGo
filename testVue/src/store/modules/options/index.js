

import {printResponse, checkField} from '@/utils/helper'

const state = {
    values: [], // for multi select
    value: null, // to support multiple single select in one components
    id: null, // the id for the wanted seleted single value
}

const getters = {
    getValues: (state) => state.values,
    getValue: (state) => {
      if(state.id != null){
        return state.value[state.id];
      }
      else{
        return state.value;
      }
    }
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
      if(! "id" in payload){
        state.value = payload;
        state.id = null;
      }
      else{
        if(state.value === null){
          state.value = {};
        }
        state.value[payload.id] = payload.value;
      }
    },
    SetSelectId: (state, id) => {
      state.id = id;
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
    },
    SetSelectId: (context, id) => {
      context.commit('SetSelectId', id);
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
