<template>  
  <div class="center">   
    <div class="text-h4 mb-5">Host View</div>
    <v-btn text @click.stop="exit">Back</v-btn> 
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <br>
    <v-text-field
      v-model="currentView"
    ></v-text-field>
    <br>
    <component
      :is="currentView"
      :playerList="playerList"
      :promptResponses="promptResponses"
      :socketInstance="socket"
      :voteCount="ballotBox"
      @change-view="currentView = $event"
    ></component>
  </div>
</template>

<script>
import waiting from '../components/HostViews/WaitingView.vue'
import respond from '../components/HostViews/PromptPlayerResponse.vue'
import vote from '../components/HostViews/VoteTally.vue'
import intro from '../components/HostViews/IntroView.vue'

import io from 'socket.io-client'

export default {
  components: {
    waiting,
    respond,
    vote,
    intro
  },
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
      // keeps ledger of the votes each player recieves. Format: { 'yona': 14 }
      ballotBox: {}
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
      })
      this.socket.on('ballot-collector', (playerBallot) => {
        this.ballotBox = { ...this.ballotBox, ...playerBallot }
      })
      document.addEventListener('visibilitychange', this.emitVisibility)
    },
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    exit() {
      this.forceDisconnect()
      this.$router.push('/')
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    }
  },
  watch: {
    currentView(v) {
      // only emits view down to player if v is a registered and valid component
      if (Object.keys(this.$options.components).includes(v)) {
        this.socket.emit('change-view', v)
      }
    }
  }
}
</script>