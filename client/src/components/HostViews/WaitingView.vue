<template>
  <div>
    Players In Game:
    <div v-for="player in playerList" :key="player.id">
      {{ player }}
    </div>
    <br><br>
    <v-btn
      @click="$emit('start-game')"
      color="green"
      dark
    >Start Game</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    playerList: {
      type: Array,
      required: true
    }
  }
}
</script>