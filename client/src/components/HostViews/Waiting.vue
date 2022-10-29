<template>
  <div>
    <center>
      <div class="text-h6 mt-3">
        Scan QR Code or Enter With RoomID {{ $store.state.roomid }} to Join
      </div>
      <div style="width: 50%">
        <v-img
          :src="qrCodeAPI"
          width="200"
          class="my-4"
        ></v-img>
        <v-text-field
          v-model="rounds"
          label="How many rounds are we playing?"
          filled
          type="number"
          max-width="10px"
        ></v-text-field>
      </div>
      <v-btn
        @click.stop="next"
        color="green"
        class="white--text mb-3"
        rounded
        large
        :disabled="playerList.filter(player => player.occupied).length < 2"
      >
        <v-icon class="mr-2">mdi-play</v-icon>
        Start Game
      </v-btn>
      <div class="text-h5">Players In Room:</div>
      <div v-for="player in playerList" :key="player.id">
        <div class="text-h6">
          {{ player.name }}
        </div>
      </div>
      <div 
        v-if="!playerList.length" 
        class="text-h6 red--text"
      >No Players Have Joined Yet</div>
    </center>
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
      this.$emit('change-view', 'intro')
    }
  },
  data() {
    return {
      rounds: 3
    }
  },
  computed: {
    url() {
      return `
        ${
          window.location.href.substring(0, window.location.href.length - 5)
        }/join?room=${
          this.$store.state.roomid
        }
      `
    },
    qrCodeAPI() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}`
    }
  },
  watch: {
    rounds(v) {
      const NUM = parseInt(v)
      if (isNaN(NUM) || NUM < 1) return
      this.$emit('round-change', NUM)
    }
  }
}
</script>