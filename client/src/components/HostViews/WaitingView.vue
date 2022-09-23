<template>
  <div>
    Players In Game:
    <div v-for="player in playerList" :key="player.id">
      {{ player }}
    </div>
    <br><br>
    <v-btn
      @click="$emit('change-view', 'intro')"
      color="green"
      dark
    >Start Game</v-btn>
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ]
}
</script>