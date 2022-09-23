export default {
  data() {
    return {
      // time remaining in seconds until view has to be changed
      timeRemaining: 100
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
        break
      case 'intro':
        break
      case 'respond':
        break
      case 'vote':
        break
      default:
        throw new Error('Uncaught Case Passed Down to HostMixin')
    }
  }
}