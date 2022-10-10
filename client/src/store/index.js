import Vue from 'vue'
import Vuex from 'vuex'
import { SoundTrack } from '@/utils/Soundboard'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // game state
    nickname: '',
    roomid: '',

    // for audio state
    blockedAudio: undefined,
    track: '',

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
    adjustMusicVolume: (state, newVolume) => {
      state.musicVolume = newVolume
      SoundTrack.setVolume()
    }
  },
  actions: {
  },
  modules: {
  }
})
