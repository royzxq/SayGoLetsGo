

import {createExpense, updateExpense, partialUpdateExpense, deleteExpense} from '@/utils/requests'
import {printResponse, checkField} from '@/utils/helper'


function find_min_transfer(balance, payments, pos, count, min_count, paymentsArray) {
    var n = balance.length
    var ret
    var found = 0

    for (var i=pos; i<n; i++){
      if (Math.abs(balance[i][1]) <= 0.1)
            balance[i][1] = 0
      else {
        pos = i
        found = 1;
        break
      }
    }
    if (found===0) {
      //alert(payments)
      if (min_count === count) {
        var array = payments.concat()
        //alert(array)
        paymentsArray.push(array)
      }
      return count
    }
    var res = 999999999



    for (var i = pos + 1; i < n; i++) {
        if (balance[pos][1] * balance[i][1] < 0) {
            //balance[i][1] += balance[pos][1]
            var temp_bi = balance[i][1]
            var temp_bp = balance[pos][1]
            if (balance[pos][1] > 0) {
              if (balance[i][1] + balance[pos][1] <= 0) {
                payments.push([balance[pos][0], balance[i][0], (balance[pos][1]).toFixed(2)])
                balance[i][1] += balance[pos][1]
                balance[pos][1] = 0
              }
              else {
                payments.push([balance[pos][0], balance[i][0], (-balance[i][1]).toFixed(2)])
                balance[pos][1] += balance[i][1]
                balance[i][1] = 0
              }
            }
            else {
              if (balance[i][1] + balance[pos][1] >= 0) {
                payments.push([balance[i][0], balance[pos][0], (-balance[pos][1]).toFixed(2)])
                balance[i][1] += balance[pos][1]
                balance[pos][1] = 0
              }
              else {
                payments.push([balance[i][0], balance[pos][0], (balance[i][1]).toFixed(2)])
                balance[pos][1] += balance[i][1]
                balance[i][1] = 0
              }
            }
            //alert('p1:'+payments)
            var next_pos
            if (balance[pos][1] == 0)
              next_pos = pos+1
            else
              next_pos = pos
            ret = find_min_transfer(balance, payments, next_pos, count + 1, min_count, paymentsArray)
          //alert('p2:'+payments)
            if (ret < res)
                res = ret

            payments.pop()
            //balance[i][1] -= balance[pos][1]
            balance[i][1] = temp_bi
            balance[pos][1] = temp_bp

        }
    }
    return res
}

function compute_payments(balance) {
    var payments = []
    var b = []
    for (var i = 0; i < balance.length; i++) {
      var v = balance[i].concat()
      b.push(v)
    }
    var min_count = find_min_transfer(b, payments, 0, 0, -1, null)
    if (min_count === 0)
      return []

    var paymentArray = []
    find_min_transfer(balance, payments, 0, 0, min_count, paymentArray)
    var diffs = []
    for (var i = 0; i < paymentArray.length; i++) {
      var payment = paymentArray[i]
      var pay_times = {}
      for (var j = 0; j < payment.length; j++) {
        var u = payment[j][0]
        if(!pay_times[u])
          pay_times[u] = 0
        pay_times[u]++
      }
      var diff = 0
      for (var u in pay_times) {
        diff += (pay_times[u] - min_count) * (pay_times[u] - min_count)
      }
      diffs.push(diff)
    }
    var min = 999999
    var min_index = 0
    for (var i = 0; i < diffs.length; i++) {
      if(diffs[i] < min) {
        min = diffs[i]
        min_index = i
      }
    }
    //alert(paymentArray[min_index])
    return paymentArray[min_index]
}
const state = {
    expense: null,
    id: null,
    user_pay: [],
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
      //alert(payload)
      var payments = compute_payments(payload)
      //alert(payments)
      context.commit('setUserpay', payments)
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
