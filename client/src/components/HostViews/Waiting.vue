<template>
  <div class="background-matte">
    <div class="background-stripe-1"></div>
    <div class="background-stripe-2"></div>
    <div class="background-stripe-3"></div>
    <div class="left-side-box pa-3 center">
      <div
        @click.stop="exit"
        class="center" 
        style="width: 100px; cursor: pointer"
      >
        <v-icon 
          large 
          color="black"
        >mdi-arrow-left-circle</v-icon>
        <p class="side-box-txt">
          Exit
        </p>
      </div>
      <div 
        class="mx-3" 
        style="width: 3px; height: 65px; background-color: black"
      ></div>
      <div 
        @click.stop="togglePause"
        class="center" 
        style="width: 100px; cursor: pointer"
      >
        <v-icon  
          large 
          color="black"
        >mdi-cog</v-icon>
        <p class="side-box-txt">
          Settings
        </p>
      </div>
    </div>
    <div class="main-qr-box center px-5">
      <h3 class="pt-1">
        {{ displayUrl }}
      </h3>
      <h1 
        style="font-size: 50px"
        class="font-weight-black"
      >
        Room {{ roomId }}
      </h1>
      <v-img
        :src="qrCodeAPI"
        lazy-src="../../../assets/extras/lazyQR.png"
        width="200"
        class="mb-2"
      ></v-img>
      <h2 class="font-weight-black">
        {{ joinMessage }}
      </h2>
    </div>
    <!-- Game must have 3 players to start -->
    <div
      @click.stop="playerList.length >= 3 ? next() : null"
      :style="`cursor: ${playerList.length >= 3 ? 'pointer' : 'not-allowed'};`"
      class="right-side-box pa-3 pl-6"
    >
      <div 
        v-if="playerList.length >= 3"
        class="center"
        style="flex-direction: row;"
      >
        <p
          class="side-box-txt" 
          style="font-size: 20pt"
        >Start Game</p>
        <v-icon
          x-large
          color="black"
        >mdi-play</v-icon>
      </div>
      <p
        v-else
        class="side-box-txt mr-1" 
        style="font-size: 20pt; opacity: 0.5"
      >
        {{ 3 - playerList.length }} More Needed To Start
      </p>
    </div>
    <div class="player-card-container">
      <div class="player-card-row">
        <div 
          v-for="player in playerList" 
          :key="player.clientId"
        >
          <div class="ma-2">
            <PlayerCard 
              :playerColor="player.color" 
              :playerName="player.name" 
              :playerPfp="player.pfp.toString()"
              :playerClientId="player.clientId"
              @player-kicked="kick($event)"
            />
          </div>
        </div>
        <div
          v-for="i in numOfOpenSpots" 
          :key="i"
        >
          <div class="ma-2">
            <PlayerCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import { Views } from '@/utils/Views'
import PlayerCard from './WaitingComponents/PlayerCard.vue'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    PlayerCard
  },
  emits: [
    'round-change',
    'player-kicked',
    'toggle-pause'
  ],
  methods: {
    next() {
      this.$emit('change-view', Views.tutorial)
    },
    kick(clientId) {
      this.$emit('kick', clientId)
    },
    exit() {
      this.$router.push('/')
    },
    openSettings() {
      this.$emit('toggle-pause')
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
    },
    roomId() {
      return this.$store.state.roomid
    },
    // example output: http://localhost:8080/join
    displayUrl() {
      return `${window.location.href.substring(0, window.location.href.length - 5)}/join`
    },
    numOfOpenSpots() {
      return this.numOfPlayerSpots - this.playerList.length
    },
    joinMessage() {
      switch (this.numOfOpenSpots) {
        case 1:
          return 'Join Now! 1 Spot Left'
        case 0:
          return 'Room Full, Time To Start The Game!'
        default:
          return `Join Now! ${this.numOfOpenSpots} Spots Left`
      }
    }
  }
}
</script>

<style scoped>
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFB118;
  position: fixed;
}
.background-stripe-1 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-85vh) translateX(30vw) rotate(80deg);
  position: fixed;
}
.background-stripe-2 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-55vh) translateX(30vw) rotate(40deg);
  position: fixed;
}
.background-stripe-3 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-55vh) translateX(30vw) rotate(130deg);
  position: fixed;
}
.main-qr-box {
  background-color: white;
  position: relative;
  width: 30vw;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 0px 0px 25px 25px;
}
.left-side-box {
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  border-radius: 0px 0px 10px 0px;
  flex-direction: row;
}
.right-side-box {
  top: 0;
  right: 0;
  position: absolute;
  background-color: white;
  border-radius: 0px 0px 0px 10px;
  flex-direction: row;
}
p.side-box-txt {
  font-weight: 1000;
  margin: 0%;
  font-size: 15pt;
}
.player-card-container {
  width: 80%;
  margin: 10px auto;
}
.player-card-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
}
</style>