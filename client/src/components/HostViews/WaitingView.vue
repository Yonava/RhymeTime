<template>
  <div>
    <center>
      Scan QR Code or Enter With RoomID {{ $store.state.roomid }} to Join  
      <v-img
        :src="qrCodeAPI"
        width="100"
      ></v-img>
      <br>
      Players In Game:
      <div v-for="player in playerList" :key="player.id">
        {{ player }}
      </div>
      <br><br>
      <v-btn
        @click.stop="next"
        color="green"
        text
      >Start Game</v-btn>
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
  }
}
</script>