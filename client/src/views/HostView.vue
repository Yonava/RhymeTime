<template>  
  <div>
    <div>
      <v-icon 
        @click.stop="manuallyPaused = !manuallyPaused"
        large
        class="mx-7 my-5"
      >{{ pausePlayIcon }}</v-icon>
      <span>{{ isPaused ? 'Paused' : 'Playing' }}</span>
    </div>
  
    <component
      :is="currentView"
      :playerList="playerList"
      :promptResponses="promptResponses"
      :socketInstance="socket"
      :winningResponse="winningResponse"
      :song="song"
      :isPaused="isPaused"
      @round-winner="addWinnerToSong($event)"
      @change-view="currentView = $event"
      @round-over="roundOver"
      @round-change="totalRounds = $event"
      @restart-game="restartGame"
    ></component>

    <!-- KeepAlive may lead to potential bugginess -->
    <KeepAlive>
      <PauseMenu 
        :visible="manuallyPaused" 
        :roundCount="roundCount"
        :totalRounds="totalRounds"
        :playerList="playerList"
        @unpause="manuallyPaused = false"
      />
    </KeepAlive>
  </div>
</template>

<script>
import waiting from '../components/HostViews/WaitingView.vue'
import respond from '../components/HostViews/PromptPlayerResponse.vue'
import vote from '../components/HostViews/VoteTally.vue'
import intro from '../components/HostViews/IntroView.vue'
import recap from '../components/HostViews/RecapView.vue'
import outro from '../components/HostViews/OutroView.vue'

import PauseMenu from '../components/HostViews/HostSubComponents/PausedDialog.vue'

import io from 'socket.io-client'

export default {
  components: {
    waiting,
    respond,
    vote,
    intro,
    recap,
    outro,
    PauseMenu
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
      // prompt responses each round are stored here. response obj. format {player, response}
      promptResponses: [],
      // stores what round the game is on
      roundCount: 1,
      // number of rounds that are to be played
      totalRounds: 3,
      // response that scored the most points in the voting round
      winningResponse: { player: '', response: '' },
      // song consists out of the winning response objects of each round
      song: [],
      // true if page is not visible (using visibilitychange event listener)
      isPageHidden: false,
      // if host selects to pause game
      manuallyPaused: false
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
  computed: {
    isPaused() {
      return this.isPageHidden || this.manuallyPaused
    },
    pausePlayIcon() {
      return this.manuallyPaused ? 'mdi-play' : 'mdi-pause'
    }
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
      this.socket.on('broadcast-game-state', () => {
        this.socket.emit('change-view', this.currentView)
      })
    },
    emitVisibility() {
      if (this.manuallyPaused) return
      this.isPageHidden = document.visibilityState === 'hidden'
      this.socket.emit('visibility-handler', this.isPageHidden)
    },
    exit() {
      this.forceDisconnect()
      this.$router.push('/')
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    },
    addWinnerToSong(winningResponse) {
      this.song.push(winningResponse)
      this.winningResponse = winningResponse
    },
    // called by 'recap' when the round recap is over
    roundOver() {
      if (this.roundCount === this.totalRounds) {
        return this.currentView = 'outro'        
      }

      // resets responses for new round
      this.promptResponses = []

      this.roundCount++
      this.currentView = 'respond'
      // make sessionStorage back-up of game state here
    },
    restartGame() {
      this.roundCount = 1
      this.currentView = 'waiting'
      this.song = []
      this.promptResponses = []
    }
  },
  watch: {
    currentView(v) {
      // only emits view down to player if v is a registered and valid component
      if (Object.keys(this.$options.components).includes(v)) {
        this.socket.emit('change-view', v)
      } else {
        console.error(`${v} is not a valid components: host refused socket emit`)
      }
    },
    manuallyPaused(v) {
      this.socket.emit('pause-state', v)
    }
  }
}
</script>