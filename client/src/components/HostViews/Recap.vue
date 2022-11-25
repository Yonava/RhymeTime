<template>
  <div
    class="background-matte center"
    :style="border"
  >
    <v-img
      :src="require(`../../../../assets/pfps/${playerPfp}.webp`)"
      class="pfp"
      aspect-ratio="1"
      max-width="125px"
    ></v-img>
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
  computed: {
    winningResponse() {
      const LAST_INX = this.winningResponses.length - 1
      return this.winningResponses[LAST_INX]
    },
    border() {
      return {
        border: `50px solid ${this.winningResponse.player.color}`
      }
    }
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
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFB118;
}
</style>