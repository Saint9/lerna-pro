import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style'

import './mock'
import request from './utils/request'

Vue.prototype.$axios = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
