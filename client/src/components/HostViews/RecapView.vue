<template>
  <div>
    Time Left: {{ timeRemaining }}
    <br>
    this is a short recap to show players how the game is going so far
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
  methods: {
    next() {
      this.$emit('round-over')
    }
  }
}
</script>