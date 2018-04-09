

import {createExpense, updateExpense, partialUpdateExpense, deleteExpense} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'

const state = {
    expense: null,
    id: null,
    user_pay: {},
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
}

const actions = {
    createExpense: (context, payload) => {
        return createExpense(payload).then(response => {
            printResponse("create the expense", response.data)
            context.commit("setExpense", response.data)
        })
    },
    calculateUserpay: (context, payload) => {
      let users = payload.users
      var epxenses = payload.expenses
      console.log(payload)
      let expense_avg = 0, expense_sum = 0
      for(let expense of epxenses){
        expense_sum += expense.expense
      }
      expense_avg = expense_sum / users.length

      var user_payment = {}
      for (let user of users){
        user_payment[user] = expense_avg
      }
      
      for(let expense of epxenses){
        if(expense.payer_id in user_payment){
          user_payment[expense.payer_id] -= expense.expense
        }
      }
      context.commit('setUserpay', user_payment)
    },
    updateExpense: (context, payload) => {
      var target = ['payee', 'expense', 'travel']
      if(checkField(target, payload)){
        return updateExpense(payload).then(response => {
          context.commit('setExpense', response.data)
        })
      }
      else{
        return partialUpdateExpense(payload).then(response => {
          context.commit('setExpense', response.data)
        })
      }
    },
    deleteExpense: (context, id) => {
      return deleteExpense(id).then( response => {
        context.commit('deleteExpense')
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