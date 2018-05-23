import {printResponse, checkField} from '@/utils/helper'
import {loadMessage, loadNotification, readNotification} from '@/utils/requests'
// import { stat } from 'fs';


const state = {
  messages: [],
  notifications: [],
  notification: null,
}

const getters = {
  getMessages: (state) => state.messages,
  getNotifications: (state) => state.notifications,
  getNotification: (state) => state.notification,
}

const mutations = {
  addMessage: (state, message) => {
    state.messages.push(message)
  },
  loadHistoryMessage: (state, messages) => {
    state.messages = messages.concat(state.messages);
  },
  loadHistoryNotification: (state, notifications) => {
    state.notifications = notifications.concat(state.notifications);
  },
  addNotification: (state, notification) => {
    state.notifications.push(notification);
  },
  readNotification: (state, id) => {
    let notifiction = state.notifications.find(o => o.id === id);
    notifiction.is_read = true;
    state.notification = notifiction;
  }
}

const actions = {
  addMessage: (context, message) => {
    var target = ['username', 'message', 'created_time']
    if(checkField(target, message)){
      context.commit('addMessage', message);
    }
  },
  loadHistoryMessage: (context, payload) => {
    var target = ['travel_group']
    if(checkField(target, payload)){
      var created_time = null;
      if (state.messages.length > 0){
        created_time = state.messages[0]['created_time']
        payload['created_time'] = created_time
      }
      loadMessage(payload).then(response => {
        printResponse('load message', response.data.results)
        context.commit('loadHistoryMessage', response.data.results.reverse());

      }).catch(error => {
        console.log("loadMessage failed")
      })
    }
  },
  addNotification: (context, notification) => {
    var target = ['source', 'subject', 'content',]
    if(checkField(target, notification)){
      context.commit('addNotification', notification)
    }
  },
  loadHistoryNotification: (context, payload=null) => {
    var created_time = null;
    if(state.notifications.length > 0){
      created_time = state.notifications[0]['created_time'];
      if(payload === null){
        payload = {};
      }
      payload['created_time'] = created_time;
    }
    loadNotification(payload).then(response => {
      printResponse('load Notification', response.data.results)
      context.commit('loadHistoryNotification', response.data.results.reverse());
    }).catch(error => {
      console.log("loadNotification failed")
    })
  },
  readNotification: (context, id) => {
    return readNotification(id).then(response => {
      context.commit('readNotification', id);
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
