<template>
  <div class="center">
    <div 
      :style="titleStyle"
      class="text-h2 white--text font-weight-black trans"
    >
      Audience Voting
    </div>
    <img 
      :style="gifStyle"
      class="tutorial-gif trans"
      src="../../../../assets/extras/audienceBoostDemo.gif" 
      alt="player vote demo"
    >
  </div>
</template>

<script>
import frameMixin from './frameMixin'

export default {
  name: 'pt5',
  mixins: [
    frameMixin
  ],
  computed: {
    titleStyle() {
      return {
        transform: this.timeElapsed > 4_500 ? 'translateY(-15px)' : 'translateY(175px)'
      }
    },
    gifStyle() {
      return {
        transform: this.timeElapsed > 4_500 ? 'translateY(0px)' : 'translateY(125px)',
        opacity: this.timeElapsed > 4_500 ? 1 : 0
      }
    }
  }
}
</script>

<style scoped>
.tutorial-gif {
  width: 100%;
  max-width: 250px;
}
.trans {
  transition: 1s ease;
}
</style>