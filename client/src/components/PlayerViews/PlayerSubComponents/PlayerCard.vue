<template>
  <div class="player-card">

  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    response: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .player-card {
    width: 100%;
  }
</style>