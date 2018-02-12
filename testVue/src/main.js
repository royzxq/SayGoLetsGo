import Vue from 'vue'
import App from './App.vue'

import Router from 'vue-router'
Vue.use(Router)
import router from './routers/routers.js'
Vue.config.productionTip = false;

import VueResources from 'vue-resource'
Vue.use(VueResources)

new Vue({
  el: '#app',
  router,
  components: {App},
  data: {
    message: "default"
  }
})
