<template>
  <div>
    Time Left: {{ timeRemaining }}
    <br>
    This Rounds Winner Was...
    <br>
    <b>{{ winningResponse.player }}</b>
    <br>
    <b>Who Wrote:</b>
    <br>
    <v-row align="center" justify="center">
      <div class="box">
        <i>{{ displayedResponse }}</i>
      </div>
    </v-row>
    <br><br><br>
    <div>What Poetry!</div>
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
      this.$emit('round-over')
    }
  }
}
</script>

<style scoped>
  .box {
    border: 1px solid black;
    width: 20vw;
  }
</style>