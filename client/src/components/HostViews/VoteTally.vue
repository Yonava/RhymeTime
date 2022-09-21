<template>
  <div>
    Your submissions:
    <br>
    {{ promptResponses }}
    <br><br><br>
    Here are the live results!
    <br>
    {{ voteCount }}
    <br>
    <v-btn @click.stop="$emit('change-view', 'respond')">Continue to next round</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    promptResponses: {
      type: Object,
      required: true
    },
    voteCount: {
      type: Object,
      required: true
    },
    socketInstance: {
      required: true
    }
  },
  destroyed() {
    // resets parent state for new round
    this.$parent.promptResponses = {}
    this.$parent.ballotBox = {}
  },
  mounted() {
    this.socketInstance.emit('candidate-list', Object.keys(this.promptResponses))
  }
  
}
</script>