import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    }
  },
  modules: {
  },
  plugins: [createLogger()]
})
