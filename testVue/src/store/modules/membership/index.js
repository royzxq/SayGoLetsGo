

import {createMembership, getMembership, getMemberships, updateMembership, deleteMembership} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'
const state = {
    member: null,
    members: [],
    id: null,
}

const getters = {
    getMembership: (state) => state.member,
    getId: state => state.id,
    getMemberships: state => state.members,
}

const mutations = {
    setMembership: (state, payload) => {
        printResponse("set member", payload)
        state.id = payload.id
        state.member = payload
        localStorage.setItem('tWeb_memberId', state.id)
    },
    deleteMembership: (state) => {
        state.member = null
        state.id = null
    },
    setId: (state, id) => {
        state.id = id
    },
    setMemberships: (state, playload) => {
        state.members = playload
    },
}

const actions = {
    fetchMembership: (context, payload=null) => {
        if (payload !== null){
            context.commit('setId', payload.id)
        }
        getMembership(state.id).then(response => {
            // console.log("fetch the user");
            // console.log(response.data)
            printResponse("fetch the member", response.data)
            context.commit("setMembership", response.data)
        }).catch(error => {
            console.log("fetch the member failed " + state.id)
        })
    },
    createMembership: (context, payload) => {
        printResponse("the member is", payload)
        return createMembership(payload).then(response => {
            printResponse("create the member", response.data)
        })
    },

    fetchMemberships: (context, payload) => {
        getMemberships(payload).then(response => {
            // console.log("fetch users")
            printResponse("fetch users", response.data.results)
            context.commit('setUsers', response.data.results)
        }).catch(error => {
            console.log("fetch users failed")
        })
    },
    setLocalMembership: (context, payload) => {
      context.commit('setMembership', payload)
    },

    deleteMembership: (context, id) => {
      return deleteMembership(id).then(response => {
        context.commit('deleteMembership')
      })
    },
    updateMembership: (context, payload) => {
        return updateMembership(payload).then(response => {
          context.commit('setMembership', response.data)
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
