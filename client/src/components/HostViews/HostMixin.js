import Clock from './HostSubComponents/ClockDisplay.vue'
import { playEffect, SoundTrack } from '@/utils/Soundboard'
import { Views } from '@/utils/Views'

export default {
  data() {
    return {
      // for interval idempotence
      timerRunning: false,
      // for developing ui only. make sure this is set to false in prod
      testMode: false,
      // component that you want to test
      testView: Views.vote
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
    winningResponses: {
      type: Array,
      required: true
    },
    isPaused: {
      type: Boolean,
      required: true
    },
    numOfPlayerSpots: {
      type: Number,
      required: true
    },
    socketInstance: {
      required: true
    }
  },
  mounted() {
    
    if (this.testMode && this.$parent.currentView !== this.testView) this.$emit('change-view', this.testView)

    this.$store.state.timeRemaining = 0

    switch (this.$parent.currentView) {
      case Views.respond:
        this.$store.state.timeRemaining = 90
        SoundTrack.playNew('respond')
        break
      case Views.vote:
        this.$store.state.timeRemaining = 30
        SoundTrack.playNew('vote')
        break
      case Views.recap:
        this.$store.state.timeRemaining = 15
        break
      case Views.waiting:
        SoundTrack.playNew('waiting')
        break
      case Views.tutorial:
        break
      case Views.endScreen:
        break
      default:
        return console.error('Uncaught Case Passed Down to HostMixin')
    }

    
    this.$store.state.totalTime = this.$store.state.timeRemaining
    this.startTimer()
  },
  destroyed() {
    clearInterval(this.timer)
    SoundTrack.pause()
  },
  methods: {
    startTimer() {
      if (this.timerRunning) return
      if (!this.$store.state.timeRemaining) return
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
      SoundTrack.pause()
    },
    unpauseGame() {
      if (!this.testMode) this.startTimer()
      SoundTrack.play()
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