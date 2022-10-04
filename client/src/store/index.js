import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: '',
    roomid: '',

    // client settings
    sfxEnabled: true,

    // clock state used by mixin parent(s) and read by ClockDisplay
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
