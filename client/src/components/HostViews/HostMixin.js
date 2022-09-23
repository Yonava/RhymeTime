export default {
  data() {
    return {
      // time remaining in seconds until view has to be changed
      timeRemaining: 30,
      // true if an interval is actively decrementing timeRemaing
      timerRunning: false
    }
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
    socketInstance: {
      required: true
    }
  },
  mounted() {
    switch (this.$parent.currentView) {
      case 'waiting': 
        return
      case 'intro':
        this.timeRemaining = 10
        break
      case 'respond':
        this.timeRemaining = 90
        break
      case 'vote':
        this.timeRemaining = 30
        break
      case 'recap':
        this.timeRemaining = 10
        break
      default:
        return console.error('Uncaught Case Passed Down to HostMixin')
    }

    this.startTimer()
  },
  methods: {
    startTimer() {
      if (this.timerRunning) return
      this.timer = setInterval(() => {
        this.timeRemaining--
        if (this.timeRemaining < 1) this.next()
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
      this.startTimer()
      // add audio controls here
    }
  }
}