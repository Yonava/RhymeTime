<template>
  <div>
    <div style="position: absolute; top: 10%; left: 2%">
      <Clock title="Next Round Starting In" />
    </div> 
    <div style="position: absolute; top: 10%; right: 2%">
      <Clock title="Next Round Starting In" />
    </div> 
    <div class="center">
      This Rounds Winner Was...
      <br>
      <b>{{ winningResponse.player.name }}</b>
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