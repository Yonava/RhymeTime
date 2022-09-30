import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: '',
    roomid: '',

    // host view clock state
    timeRemaining: 30,
    totalTime: 30,
    almostOutOfTime: 5
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
