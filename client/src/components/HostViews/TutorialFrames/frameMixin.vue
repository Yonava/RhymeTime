<script>
export default {
  props: {
    isPaused: {
      type: Boolean,
      required: true
    },
    playerList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timeElapsed: 0
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  mounted() {
    const TIME_STAGGER = 50
    this.timer = setInterval(() => {
      if (this.isPaused) return
      this.timeElapsed += TIME_STAGGER
    }, TIME_STAGGER)
  },
}
</script>

<style scoped>
.trans-op {
  transition: opacity 500ms;
}
</style>