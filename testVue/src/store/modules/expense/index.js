

import {createExpense} from '@/utils/requests'
import {printResponse} from '@/utils/helper'

const state = {
    expense: null,
    id: null,
    user_pay: {},
    activity_id: null,
}

const getters = {
    getExpense: (state) => state.expense,
    getId: state => state.id,
    getUserpay: state => state.user_pay,
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
    setUserpay: (state, payload) => {
      state.user_pay = payload
    },
    setActivityId: (state, id) => {
      state.activity_id = id
    },
}

const actions = {
    setActivity: (context, payload) => {
      context.commit("setActivityId", payload)
    },
    createExpense: (context, payload) => {
      payload.expense_activity = state.activity_id
        return createExpense(payload).then(response => {
            printResponse("create the expense", response.data)
            context.commit("setExpense", response.data)
        })
    },
    calculateUserpay: (context, payload) => {
      let activities = payload.activities
      let users = payload.users
      let expense_avg = 0, expense_sum = 0
      for (let activity of activities){
        for(let expense of activity.expense_activity){
          expense_sum += expense.expense
        }
      }
      expense_avg = expense_sum / users.length
      var user_payment = {}
      for (let user of users){
        user_payment[user] = expense_avg
      }
      for (let activity of activities){
        for(let expense of activity.expense_activity){
          if(expense.user in user_payment){
            user_payment[expense.user] -= expense.expense
          }
        }
      }
      context.commit('setUserpay', user_payment)

    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};