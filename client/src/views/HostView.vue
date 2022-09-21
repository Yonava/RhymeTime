<template>  
  <div class="center">   
    <div class="text-h4 mb-5">Host View</div>
    <v-btn text @click.stop="exit">Back</v-btn> 
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <v-btn @click="changeView">Emit view change</v-btn>
    <br>
    <v-text-field
      v-model="currentView"
    ></v-text-field>
    <br>
    <div :key="update">
      <div v-for="(player, index) in playerList" :key="player.id">
        {{ index + 1 }} - {{ player }} {{ promptResponses[player] }}
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      // true if sockets have successfully connected to the server
      connectionStatus: false,
      // stores socket instance
      socket: null,
      // sets the current view of the game, emits to players
      currentView: 'waiting',
      // playerlist contains strings of every connected players nickname
      playerList: [],
      // prompt responses each round are stored here
      promptResponses: {},
      update: false
    }
  },
  destroyed() {
    if (this.socket?.connected) this.socket.disconnect()
    document.removeEventListener('visibilitychange', this.emitVisibility)
  },
  mounted() {
    this.connectSocket()
  },
  methods: {
    connectSocket() {
      const SOCKET_URL = window.location.href.includes('localhost') ? 'http://localhost:3000' : '/'
      if (this.socket?.connected) return
      this.socket = io(SOCKET_URL)
      this.socket.on('connect', () => { 
        this.socket.emit('join-room', this.$store.state.roomid, (response) => {
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
      this.socket.on('player-prompt-submission', (playerResponse) => {
        // obj1 U obj2: obj2 takes precedence over obj1
        this.promptResponses = { ...this.promptResponses, ...playerResponse }
        this.update = !this.update
      })
      document.addEventListener('visibilitychange', this.emitVisibility)
    },
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    changeView() {
      this.socket.emit('change-view', this.currentView)
    },
    exit() {
      this.forceDisconnect()
      this.$router.push('/')
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    }
  }
}
</script>