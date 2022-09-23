<template>  
  <div class="center">   
    <div class="text-h4 mb-2">Host View</div>
    <v-btn text @click.stop="exit">Back</v-btn>
    <p v-if="currentView != 'waiting'">Round {{ roundCount }}/{{ totalRounds }}</p>
    <component
      :is="currentView"
      :playerList="playerList"
      :promptResponses="promptResponses"
      :socketInstance="socket"
      @change-view="currentView = $event"
      @round-over="roundOver"
      @round-change="totalRounds = $event"
      ref="hostComponents"
    ></component>
  </div>
</template>

<script>
import waiting from '../components/HostViews/WaitingView.vue'
import respond from '../components/HostViews/PromptPlayerResponse.vue'
import vote from '../components/HostViews/VoteTally.vue'
import intro from '../components/HostViews/IntroView.vue'
import recap from '../components/HostViews/RecapView.vue'

import io from 'socket.io-client'

export default {
  components: {
    waiting,
    respond,
    vote,
    intro,
    recap
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
      promptResponses: [],
      // stores what round the game is on
      roundCount: 1,
      // number of rounds that are to be played
      totalRounds: 3
    }
  },
  destroyed() {
    if (this.socket?.connected) this.socket.disconnect()
    document.removeEventListener('visibilitychange', this.emitVisibility)
  },
  mounted() {
    this.connectSocket()
    document.addEventListener('visibilitychange', this.emitVisibility)
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
        this.promptResponses.push(playerResponse)
      })
      this.socket.on('ballot-collector', (playerBallot) => {
        this.$refs.hostComponents.countVotes(playerBallot)
      })
    },
    emitVisibility() {
      document.visibilityState === 'hidden' ? this.$refs.hostComponents.pauseGame() : this.$refs.hostComponents.unpauseGame()
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    exit() {
      this.forceDisconnect()
      this.$router.push('/')
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    },
    // called by 'recap' when the round recap is over
    roundOver() {
      if (this.roundCount === this.totalRounds) {
        // change currentView to the end state later
        this.$router.push('/')
      }
      this.roundCount++
      this.currentView = 'respond'
      // make sessionStorage back-up of game state here
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