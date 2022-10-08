import Clock from './HostSubComponents/ClockDisplay.vue'
import { playEffect } from '@/utils/Soundboard'

export default {
  data() {
    return {
      // if false, timer will never be run on that component
      timerDisabled: false,
      // for interval idempotence
      timerRunning: false,
      // stores audio instance for gameplay music
      audio: undefined,

      // for developing ui only. make sure this is set to false in prod
      testMode: false,
      // component that you want to test
      testView: 'respond'
    }
  },
  components: {
    Clock
  },
  props: {
    promptResponses: {
      type: Array,
      required: true
    },
    playerList: {
      type: Array,
      require: true
    },
    song: {
      type: Array,
      required: true
    },
    isPaused: {
      type: Boolean,
      required: true
    },
    socketInstance: {
      required: true
    }
  },
  mounted() {
    
    if (this.testMode && this.$parent.currentView !== this.testView) this.$emit('change-view', this.testView)
    if (this.testMode) this.timerDisabled = true
    
    /*
      TODO:
      could each component be represented an object
      with properties of sound track, timeLimit etc
      maybe a ts enum??? worth exploring!
    */

    switch (this.$parent.currentView) {
      case 'respond':
        this.$store.state.timeRemaining = 90
        this.audio = new Audio(require('../../../assets/respond.mp3'))
        break
      case 'vote':
        this.$store.state.timeRemaining = 30
        this.audio = new Audio(require('../../../assets/vote.mp3'))
        break
      case 'recap':
        this.$store.state.timeRemaining = 15
        this.audio = undefined
        break
      case 'waiting': 
        this.audio = new Audio(require('../../../assets/waiting.mp3'))
        this.timerDisabled = true
        break
      case 'intro':
        this.audio = undefined
        this.timerDisabled = true
        break
      case 'outro':
        this.audio = undefined
        this.timerDisabled = true
        break
      default:
        return console.error('Uncaught Case Passed Down to HostMixin')
    }

    this.$store.state.totalTime = this.$store.state.timeRemaining
    if (this.audio?.play()) this.audio.play()
    this.startTimer()
  },
  destroyed() {
    clearInterval(this.timer)
    if (this.audio?.pause()) {
      this.audio.pause()
      this.audio = undefined
    }
  },
  methods: {
    startTimer() {
      if (this.timerRunning || this.timerDisabled) return
      this.timer = setInterval(() => {

        this.$store.state.timeRemaining--

        if (this.$store.state.timeRemaining === 0) {
          this.stopTimer()
          setTimeout(() => this.next(), 500)
        } 
        
        if (this.$store.state.timeRemaining <= this.$store.state.almostOutOfTime) {
          playEffect('beep')
        }

      }, 1000)
      this.timerRunning = true
    },
    stopTimer() {
      if (!this.timerRunning) return
      clearInterval(this.timer)
      this.timerRunning = false
    },
    pauseGame() {
      this.stopTimer()
      if (this.audio?.pause()) this.audio.pause()
    },
    unpauseGame() {
      if (!this.testMode) this.startTimer()
      if (this.audio?.play()) this.audio.play()
    }
  },
  watch: {
    isPaused: {
      immediate: true,
      handler(v) {
        // lets mounted hook finish executing
        this.$nextTick(() => {
          v ? this.pauseGame() : this.unpauseGame()
        })
      }
    }
  }
}