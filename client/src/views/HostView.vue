<template>  
  <div>
    <v-toolbar>
      <v-icon @click.stop="exit">mdi-chevron-left</v-icon>
      <div class="text-h6">playing in room {{ $store.state.roomid }}</div>
      <v-spacer></v-spacer>
      <div 
        v-if="currentView != 'waiting'" 
        class="text-p"
      >round {{ roundCount }} out of {{ totalRounds }}</div>
    </v-toolbar>
    <component
      :is="currentView"
      :playerList="playerList"
      :promptResponses="promptResponses"
      :socketInstance="socket"
      :winningResponse="winningResponse"
      :song="song"
      @round-winner="addWinnerToSong($event)"
      @change-view="currentView = $event"
      @round-over="roundOver"
      @round-change="totalRounds = $event"
      @restart-game="restartGame"
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
import outro from '../components/HostViews/OutroView.vue'

import io from 'socket.io-client'

export default {
  components: {
    waiting,
    respond,
    vote,
    intro,
    recap,
    outro
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
      playerList: ['Yona', 'Josh', 'Jack'],
      // prompt responses each round are stored here. response obj. format {player, response}
      promptResponses: [{
        player: 'dummy',
        response: `I write this email announcing our second SNHU Buddies Event of the semester! We are all very excited to see you all Wednesday, October 5th from 6 p.m. to 7:30 p.m. In the lobby of Belknap Hall.
There will be drinks and popcorn provided. We cannot wait to see you all there!`
      }, {
        player: 'dummy',
        response: `dsnipsfnvioniofnfivpofevienfveionv
        fsvinpefvpienwpineviunovepinvefpivne
        fvqopfbhqubvgnfou;vblnwfv'ebufvewoub;euobv;
        qfiblf;bdw'l;fgnqu;bfqnbvodf;bnver'oivnasfouv'nsavs
        fvi;qdbfnqpobvnf;vnvdfoinfbvwe;i`
      },{
        player: 'dummy',
        response: `dsnipsfnvioniofnfivpofevienfveionv
        fsvinpefvpienwpineviunovepinvefpivne
        fvqopfbhqubvgnfou;vblnwfv'ebufvewoub;euobv;
        qfiblf;bdw'l;fgnqu;bfqnbvodf;bnver'oivnasfouv'nsavs
        fvi;qdbfnqpobvnf;vnvdfoinfbvwe;i`
      },{
        player: 'dummy',
        response: `dsnipsfnvioniofnfivpofevienfveionv
        fsvinpefvpienwpineviunovepinvefpivne
        fvqopfbhqubvgnfou;vblnwfv'ebufvewoub;euobv;
        qfiblf;bdw'l;fgnqu;bfqnbvodf;bnver'oivnasfouv'nsavs
        fvi;qdbfnqpobvnf;vnvdfoinfbvwe;i`
      },{
        player: 'dummy',
        response: `dsnipsfnvioniofnfivpofevienfveionv
        fsvinpefvpienwpineviunovepinvefpivne
        fvqopfbhqubvgnfou;vblnwfv'ebufvewoub;euobv;
        qfiblf;bdw'l;fgnqu;bfqnbvodf;bnver'oivnasfouv'nsavs
        fvi;qdbfnqpobvnf;vnvdfoinfbvwe;i`
      },{
        player: 'dummy',
        response: `dsnipsfnvioniofnfivpofevienfveionv
        fsvinpefvpienwpineviunovepinvefpivne
        fvqopfbhqubvgnfou;vblnwfv'ebufvewoub;euobv;
        qfiblf;bdw'l;fgnqu;bfqnbvodf;bnver'oivnasfouv'nsavs
        fvi;qdbfnqpobvnf;vnvdfoinfbvwe;i`
      }],
      // stores what round the game is on
      roundCount: 1,
      // number of rounds that are to be played
      totalRounds: 3,
      // response that scored the most points in the voting round
      winningResponse: { player: '', response: '' },
      // song consists out of the winning response objects of each round
      song: []
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
      this.socket.on('ballot-collector', (playerBallot) => {
        this.$refs.hostComponents.countVotes(playerBallot)
      })
      this.socket.on('broadcast-current-view', () => {
        this.socket.emit('change-view', this.currentView)
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
      }
    }
  }
}
</script>