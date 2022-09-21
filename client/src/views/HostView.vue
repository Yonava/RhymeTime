<template>  
  <div class="center">   
    <div class="text-h4 mb-5">Host View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn> 
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <v-btn @click="changeView">Emit view change</v-btn>
    <br>
    <v-btn @click="connectSocket" color="green" dark>connect to {{ $route.query.room }}</v-btn>
    <br>
    <v-btn @click="forceDisconnect" color="red" dark>disconnect socket</v-btn>
    <br>
    <div v-for="(player, index) in playerList" :key="player.id">
      {{ index + 1 }} - {{ player }}
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      connectionStatus: false,
      socket: null,
      currentView: 0,
      playerList: []
    }
  },
  methods: {
    connectSocket() {
      const SOCKET_URL = window.location.href.includes('localhost') ? 'http://localhost:3000' : '/'
      if (this.socket?.connected) return
      this.socket = io(SOCKET_URL)
      this.socket.on('connect', () => { 
        this.socket.emit('join-room', this.$route.query.room, (response) => {
          if (response === 'connected') {
            this.connectionStatus = true
            this.socket.emit('host-present')
            this.socket.emit('report-to-host')
          }
        })
      })
      this.socket.on('player-join', (playerName) => {
        this.playerList.push(playerName)
      })
      this.socket.on('report-to-players', () => {
        this.socket.emit('host-present')
      })
      this.socket.on('roll-call', () => {
        this.playerList = []
        this.socket.emit('host-present')
      })
      document.addEventListener('visibilitychange', this.emitVisibility)
    },
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    changeView() {
      this.currentView++
      this.socket.emit('change-view', this.currentView)
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
      this.playerList = []
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.emitVisibility)
  }
}
</script>

<style>

</style>
