<template>
  <div class="center">
    <div 
      :style="titleStyle"
      class="text-h2 white--text font-weight-black trans"
    >
      Winning It All
    </div>
    <img 
      :style="gifStyle"
      class="tutorial-gif trans"
      src="../../../../assets/extras/hostEndScreenDemo.gif" 
      alt="end screen demo"
    >
  </div>
</template>

<script>
import frameMixin from './frameMixin'

export default {
  name: 'pt6',
  mixins: [
    frameMixin
  ],
  computed: {
    titleStyle() {
      return {
        transform: this.timeElapsed > 4_500 ? 'translateY(-15px)' : 'translateY(150px)'
      }
    },
    gifStyle() {
      return {
        transform: this.timeElapsed > 4_500 ? 'translateY(0px)' : 'translateY(50px)',
        opacity: this.timeElapsed > 4_500 ? 1 : 0
      }
    }
  }
}
</script>

<style scoped>
.tutorial-gif {
  width: 100%;
  max-width: 750px;
}
.trans {
  transition: 1s ease;
}
</style>