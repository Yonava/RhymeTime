<template>
  <div class="center pa-4 clock-parent">
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
        {{ timeLeft }}
      </div>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    totalTime: {
      type: Number,
      required: true
    },
    timeLeft: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: 'Moving On In'
    }
  },
  computed: {
    progress() {
      return (this.timeLeft / this.totalTime) * 100
    },
    color() {
      const RANGE = [0, this.totalTime / 2, this.totalTime]
      let rgb = [0, 0, 0]
      rgb[0] = ((RANGE[2] - this.timeLeft) / (RANGE[2] - RANGE[1])) * 255;
      rgb[1] = (this.timeLeft/RANGE[1]) * 255; 

      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
  }
}
  
</script>

<style scoped>
  .clock-parent {
    border: 2px solid black; 
    border-radius: 10px;
    background-color: #f7f7f7
  }
</style>