

import {getActivities, createActivity, updateActivity, partialUpdateActivity, deleteActivity} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'

function compare_time(a, b){
  if(Date.parse(a.start_time) > Date.parse(b.start_time)){
    return 1;
  }
  if(Date.parse(a.start_time) < Date.parse(b.start_time)){
    return -1;
  }
  return 0;
}

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
    deleteActivity: (state, id) => {
        state.activity = null
        state.id = null
        for (var i = state.activities.length - 1; i >= 0; i--){
          if(state.activities[i].id === id){
            state.activities.splice(i, 1);
          }
        }
    },
    setId: (state, id) => {
        state.id = id
    },
    setActivities: (state, payload) => {
        state.activities = payload
    },
    addActivity: (state, payload) => {
      state.activities.push(payload);
      state.activities.sort(compare_time);
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
        return createActivity(payload).then(response => {
            printResponse("create the activity", response.data)
            context.commit('setId', response.data.id);
            context.commit("setActivity", response.data);
            context.commit('addActivity', response.data);
        })
    },
    updateActivity: (context, payload) =>{
      var target = ['id', 'start_time', 'duration', 'activity', 'note', 'travel', 'place']
      if(checkField(target, payload)){
        return updateActivity(payload).then(response => {
          context.commit('setActivity', response.data)
        })
      }
      else{
        return partialUpdateActivity(payload).then(response => {
          context.commit('setActivity', response.data)
        })
      }
    },
    deleteActivity: (context, id) => {
      return deleteActivity(id).then(response => {
        context.commit('deleteActivity', id);
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