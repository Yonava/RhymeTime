<template>
  <div>
    <div style="position: absolute; top: 10%; left: 2%">
      <Clock
        :timeLeft="timeRemaining"
        :totalTime="totalTime"
        title="Next Round Starting In"
      />
    </div> 
    <div style="position: absolute; top: 10%; right: 2%">
      <Clock
        :timeLeft="timeRemaining"
        :totalTime="totalTime"
        title="Next Round Starting In"
      />
    </div> 
    <div class="center">
      This Rounds Winner Was...
      <br>
      <b>{{ winningResponse.player }}</b>
      <br>
      <b>Who Wrote:</b>
      <br>
      <div class="box">
        <i>{{ displayedResponse }}</i>
      </div>
      <div>What Poetry!</div>
      <v-btn @click="next">next</v-btn>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
  data() {
    return {
      displayedResponse: ''
    }
  },
  props: {
    winningResponse: {
      type: Object,
      required: true,
      default: () => {
        return {
          player: 'Nobody',
          response: ':('
        }
      }
    }
  },
  mounted() {
    let counter = 0;
    this.writeText = setInterval(() => {
      if (this.displayedResponse == this.winningResponse.response) {
        clearInterval(this.writeText)
      } else {
        this.displayedResponse += this.winningResponse.response[counter]
        counter++
      }
    }, 50)
  },
  methods: {
    next() {
      if (this.testMode) return
      this.$emit('round-over')
    }
  }
}
</script>

<style scoped>
  .box {
   
  }
</style>