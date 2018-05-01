import Vue from 'vue'
import App from './App.vue'

import Router from 'vue-router'
Vue.use(Router)
import router from './routers/routers.js'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.config.productionTip = false;

import VueResources from 'vue-resource'
Vue.use(VueResources)

import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  data: {
    message: "default"
  }
})
