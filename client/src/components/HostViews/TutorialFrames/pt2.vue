<template>
  <div 
    class="center" 
    
  >
    <v-icon
      v-if="!isQRCodeVisible"
      size="200"
      color="white"
    >
      mdi-exclamation-thick
    </v-icon>
    <v-img 
      v-else
      :src="qrCodeAPI" 
      lazy-src="../../../../assets/extras/lazyQR.png"
      style="width: 275px; height: 275px;"
      class="qr-code"
      alt="qrCode"
    />
    <div class="player-card-container mt-6">
      <div 
        :style="playerCardOpacity"
        class="player-card-row"
      >
        <div 
          v-for="player in playerList" 
          :key="player.clientId"
        >
          <div 
            :style="playerCardColor(player)"
            class="player-card" 
          >
            <img
              :src="pfpSource(player)"
              class="pfp"
            />
            <h1 class="font-weight-black white--text">
              {{ player.name }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import frameMixin from './frameMixin.vue'

export default {
  name: 'pt2',
  mixins: [
    frameMixin
  ],
  methods: {
    playerCardColor(player) {
      return {
        backgroundColor: player.color
      }
    },
    pfpSource(player) {
      return require(`../../../../assets/pfps/${player.pfp}.webp`)
    }
  },
  computed: {
    playerCardOpacity() {
      return {
        opacity: this.timeElapsed > 2200 ? 1 : 0
      }
    },
    isQRCodeVisible() {
      return this.timeElapsed > 3300
    },
    url() {
      return `
        ${
          window.location.href.substring(0, window.location.href.length - 5)
        }/audience?room=${
          this.$store.state.roomid
        }
      `
    },
    qrCodeAPI() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.url}&color=262626&bgcolor=ffffff&format=webp`
    },
  }
}
</script>

<style scoped>
.player-card-container {
  width: 80%;
}
.player-card-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-flow: wrap;
  transition: 1s;
}
.player-card {
  margin: 10px;
  width: 250px; 
  height: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.pfp {
  margin: 7px;
  margin-right: 10px;
  border-radius: 10px;
  width: 85px;
  height: 85px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>