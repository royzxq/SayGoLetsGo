

import {createExpense} from '@/utils/requests'
import {printResponse} from '@/utils/helper'

const state = {
    expense: null,
    id: null,
}

const getters = {
    getExpense: (state) => state.expense,
    getId: state => state.id,
}

const mutations = {
    setExpense: (state, payload) => {
        printResponse("add expense", payload)
        state.id = payload.id
        state.expense = payload
    },
    deleteExpense: (state) => {
        state.expense = null
        state.id = null
    },
    setId: (state, id) => {
        state.id = id
    }, 
}

const actions = {
    createExpense: (context, payload) => {
        createExpense(payload).then(response => {
            printResponse("create the expense", response.data)
            context.commit("setExpense", response.data)
        }).catch(error => {
            console.log("create the expense failed ")
            context.commit("deleteExpense")
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