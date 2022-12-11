<template>
  <div>
    <div 
      :style="titleOpacity"
      class="text-h1 white--text font-weight-black trans-op mb-5"
    >
      RhymeTime!
    </div>
    <div class="d-flex align-center justify-center ">
      <v-icon
        :style="thinkOpacity"
        size="100"
        class="trans-op"
        color="white"
      >mdi-thought-bubble</v-icon>
      <v-spacer></v-spacer>
      <v-icon
        :style="linkOpacity"
        size="100"
        class="trans-op"
        color="white"
      >mdi-vector-link</v-icon>
      <v-spacer></v-spacer>
      <v-icon
        :style="stinkOpacity"
        size="100"
        class="trans-op"
        color="white"
      >mdi-scent</v-icon>
    </div>
  </div>
</template>

<script>
import frameMixin from './frameMixin'

export default {
  name: 'pt1',
  mixins: [
    frameMixin
  ],
  computed: {
    titleOpacity() {
      return {
        opacity: this.timeElapsed > 500 ? 1 : 0
      }
    },
    thinkOpacity() {
      return {
        opacity: this.timeElapsed > 2500 ? 1 : 0
      }
    },
    linkOpacity() {
      return {
        opacity: this.timeElapsed > 4000 ? 1 : 0
      }
    },
    stinkOpacity() {
      return {
        opacity: this.timeElapsed > 6000 ? 1 : 0
      }
    }
  },
}
</script>

<style scoped>
.trans-op {
  transition: opacity 500ms;
}
</style>
