import Clock from './HostSubComponents/ClockDisplay.vue'

export default {
  data() {
    return {
      // total time in seconds that the component stays active for
      totalTime: 30,
      // time remaining in seconds until view has to be changed
      timeRemaining: 30,
      // true if an interval is actively decrementing timeRemaing
      timerRunning: false,

      // for developing ui only. make sure this is set to false in prod
      testMode: false,
      // component that you want to test
      testView: 'intro'
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
    socketInstance: {
      required: true
    }
  },
  mounted() {

    if (this.testMode && this.$parent.currentView !== this.testView) {
      this.$emit('change-view', this.testView)
    }

    // could each component be represented an object
    // with properties of sound track, timeLimit etc
    // maybe a ts enum??? worth exploring!
    switch (this.$parent.currentView) {
      case 'respond':
        this.timeRemaining = 90
        break
      case 'vote':
        this.timeRemaining = 20
        break
      case 'recap':
        this.timeRemaining = 10
        break
      case 'waiting': 
        return
      case 'intro':
        return
      case 'outro':
        return
      default:
        return console.error('Uncaught Case Passed Down to HostMixin')
    }

    this.totalTime = this.timeRemaining
    if (!this.testMode) this.startTimer()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    startTimer() {
      if (this.timerRunning) return
      this.timer = setInterval(() => {
        this.timeRemaining--
        if (this.timeRemaining < 0) this.next()
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
      // add audio controls here
    },
    unpauseGame() {
      if (!this.testMode) this.startTimer()
      // add audio controls here
    }
  }
}