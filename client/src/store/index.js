import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // game state
    nickname: '',
    roomid: '',

    // client settings
    sfxVolume: 100,
    musicVolume: 100,

    // clock state used by mixin parent(s) and read by ClockDisplay
    timeRemaining: 0,
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
