<template>
  <v-progress-circular
    :value="progress"
    :size="size"
    :color="color"
    style="background: rgba(255,255,255, 0.9); border-radius: 50px"
    class="clock pa-12"
  >
    <div class="text-h3 black--text" style="font-weight: 900; z-index: 2;">
      {{ timeRemaining }}
    </div>
  </v-progress-circular>
</template>

<script>

export default {
  props: {
    size: {
      type: String,
      required: false,
      default: '27'
    }
  },
  computed: {
    timeRemaining() {
      return this.$store.state.timeRemaining
    },
    totalTime() {
      return this.$store.state.totalTime
    },
    progress() {
      return (this.timeRemaining / this.totalTime) * 100
    },
    color() {
      const RANGE = [0, this.totalTime / 2, this.totalTime]
      let rgb = [0, 0, 0]
      rgb[0] = ((RANGE[2] - this.timeRemaining) / (RANGE[2] - RANGE[1])) * 255;
      rgb[1] = (this.timeRemaining/RANGE[1]) * 255; 

      return `rgb(${rgb.join(',')})`
    }
  }
}
</script>

<style scoped>
  .clock {
    transition: 250ms; 
  }
</style>