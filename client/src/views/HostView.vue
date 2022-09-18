<template>  
  <div class="center">   
    <div class="text-h4 mb-5">Host View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn> 
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <v-btn @click="changeView">Change View</v-btn>
    <v-btn @click="disc">disconnect socket</v-btn>
    <div v-for="(player, index) in playerList" :key="player.id">
      {{ index + 1 }} - {{ player }}
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
export default {
  data() {
    return {
      connectionStatus: false,
      socket: null,
      currentView: 0,
      playerList: []
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000')
    this.socket.on('connect', () => {
      this.connectionStatus = true
    })
    this.socket.on('player-join', (playerName) => {
      this.playerList.push(playerName)
    })
    this.socket.on('call-for-report', () => {
      this.playerList = []
    })
    document.addEventListener('visibilitychange', this.emitVisibility)
  },
  methods: {
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    changeView() {
      this.currentView++
      this.socket.emit('change-view', this.currentView)
    },
    forceDisconnect() {
      this.socket.disconnect()
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.emitVisibility)
  }
}
</script>

<style>

</style>
