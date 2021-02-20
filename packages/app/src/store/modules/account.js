import axios from '@/utils/request'
// initial state
const state = () => ({
  userInfo: {}
})

// getters
const getters = {}

// actions
const actions = {
  async GetUserInfo ({ commit }) {
    const { data } = await axios.post('/mock/userInfo')
    console.log(data)
    commit('SET_USER_INFO', data)
  },
  Logout ({ commit }) {
    commit('SET_USER_INFO', {})
  }
}

// mutations
const mutations = {
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
