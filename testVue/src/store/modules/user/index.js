

import {createUser, getUserId, getUsers, updateUser, partialUpdateUser, deleteUser, createFriendship, deleteFriendship} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'
const state = {
    user: null,
    users: [],
    groupUsers: [],
    id: null,
    local_user: null,
    local_id: null,
}

const getters = {
    getUser: (state) => state.user,
    getId: state => state.id,
    getUsers: state => state.users,
    getGroupUsers: state => state.groupUsers,
    getLocalUser: state => state.local_user,
    getLocalId: state => state.local_id,
}

const mutations = {
    setUser: (state, payload) => {
        // console.log("set user")
        // console.log(payload)
        printResponse("set user", payload)
        state.id = payload.id
        state.user = payload
    },
    deleteUser: (state) => {
        state.local_id = null
        state.local_user = null
    },
    setId: (state, id) => {
        state.id = id
    },
    setUsers: (state, playload) => {
        state.users = playload
    },
    setGroupUsers: (state, playload) => {
        state.groupUsers = playload
    },
    setLocalUser: (state, payload) => {
        printResponse('set local user', payload)
        state.local_user = payload
        state.local_id = payload.id
        localStorage.setItem('tWeb_userId', payload.id)
    },
    setLocalId: (state, id) => {
        state.local_id = id
    }

}

const actions = {
    fetchUser: (context, payload=null) => {
        if (payload !== null){
            context.commit('setId', payload.id)
        }
        if ( state.user !== null && state.id === state.user.id){
            return ;
        }
        getUserId(state.id).then(response => {
            // console.log("fetch the user");
            // console.log(response.data)
            printResponse("fetch the user", response.data)
            context.commit("setUser", response.data)
        }).catch(error => {
            console.log("fetch the user failed " + state.id)
        })
    },
    createUser: (context, payload) => {
        printResponse("the user is", payload)
        return createUser(payload).then(response => {
            printResponse("create the user", response.data)
            context.commit('setLocalId', response.data.id)
            context.commit("setLocalUser", response.data)
        })
    },
    setId: (context, id) => {
        context.commit('setId', id)
        return getUserId(state.id).then(response => {
            // console.log("fetch the user");
            // console.log(response.data)
            printResponse("fetch the user", response.data)
            context.commit("setUser", response.data)
        })
    },
    fetchUsers: (context, payload) => {
        getUsers(payload).then(response => {
            // console.log("fetch users")
            printResponse("fetch users", response.data.results)
            context.commit('setUsers', response.data.results)
        }).catch(error => {
            console.log("fetch users failed")
        })
    },
    fetchGroupUsers: (context, travelgroupId) => {
        getUsers(travelgroupId).then(response => {
            // console.log("fetch users")
            printResponse("fetch group users", response.data.results)
            context.commit('setGroupUsers', response.data.results)
        }).catch(error => {
            console.log("fetch users failed")
        })
    },
    setLocalId: (context, id) => {
        if (id !== state.local_id){
            context.commit('setLocalId', id)
            getUserId(id).then(response => {
                printResponse("fetch the user", response.data)
                context.commit("setLocalUser", response.data)
                context.commit("setUser", response.data)
            }).catch(error => {
                printResponse("get user failed", error)
            })
        }
        else{
            context.commit("setUser", state.local_user)
        }
    },
    fetchLocalUser: (context, payload) => {
        getUsers(payload).then(response => {
            printResponse("fetch users", response.data.results)
            context.commit('setLocalUser', response.data.results[0])
            context.commit("setUser", state.local_user)
        }).catch(error => {
            printResponse("get users failed", error)
        })
    },
    deleteUser: (context, id) => {
      return deleteUser(id).then(response => {
        context.commit('deleteUser')
      })
    },
    updateUser: (context, payload) => {
      var target = ['id', 'username', 'email', 'profile']
      if (checkField(target, payload)){
        return updateUser(payload).then(response => {
          context.commit('setLocalUser', response.data)
        })
      }
      else{
        return partialUpdateUser(payload).then(response => {
          context.commit('setLocalUser', response.data)
        })
      }
    },
    createFriendship: (context, payload) => {
      var target = ['user']
      if(checkField(target, payload)){
        return createFriendship(payload)
      }
    },
    deleteFriendship: (context, id) => {
      return deleteFriendship(id)
    },

}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
