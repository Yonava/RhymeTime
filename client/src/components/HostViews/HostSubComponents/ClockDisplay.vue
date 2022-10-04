<template>
  <div 
    class="center pa-4 clock-parent"
    :style="`background-color: ${backgroundColor}`"
  >
    <div class="text-h6 mb-2">
      {{ title }}
    </div>
    <v-progress-circular
      :value="progress"
      class="mr-2 pa-12"
      size="30"
      :color="color"
    >
      <div class="text-h3">
        {{ $store.state.timeRemaining }}
      </div>
    </v-progress-circular>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Moving On In'
    }
  },
  data() {
    return {
      backgroundColor: 'rgb(245, 245, 245)'
    }
  },
  mounted() {
    // engages watcher to play red flashing and beep effect
    this.$watch(() => this.$store.state.timeRemaining, (v) => {
      if (v <= this.$store.state.almostOutOfTime) {
        this.backgroundColor = 'rgb(255, 225, 225)'
        setTimeout(() => {
          this.backgroundColor = 'rgb(245, 245, 245)'
        }, 250)
      }
    })
  },
  computed: {
    progress() {
      return (this.$store.state.timeRemaining / this.$store.state.totalTime) * 100
    },
    color() {
      const RANGE = [0, this.$store.state.totalTime / 2, this.$store.state.totalTime]
      let rgb = [0, 0, 0]
      rgb[0] = ((RANGE[2] - this.$store.state.timeRemaining) / (RANGE[2] - RANGE[1])) * 255;
      rgb[1] = (this.$store.state.timeRemaining/RANGE[1]) * 255; 

      return `rgb(${rgb.join(',')})`
    }
  }
}
</script>

<style scoped>
  .clock-parent {
    border: 2px solid black; 
    border-radius: 10px;
    transition: 250ms; 
  }
</style>