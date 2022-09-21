import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: Math.random().toString().substring(2, 6),
    roomid: 'aroom'
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
