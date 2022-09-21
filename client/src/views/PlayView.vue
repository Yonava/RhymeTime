<template>
  <div class="center">   
    <div class="text-h4 mb-5">Player View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn>  
    <component
      :is="currentView"
      :candidates="candidates"
      :wordsInPrompt="wordsInPrompt"
      :socketInstance="socket"
    ></component>
    <v-dialog
      v-model="showPauseDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Game Paused!
        </v-card-title>
        <v-card-text>
          Host screen is currently not visible. Once host screen becomes visible again, the game may resume.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import vote from '../components/GameplayViews/VotingView.vue'
import respond from '../components/GameplayViews/SubmitResponse.vue'
import waiting from '../components/GameplayViews/WaitingView.vue'
import intro from '../components/GameplayViews/IntroView.vue'

import io from 'socket.io-client'

export default {
  components: {
    vote,
    respond,
    waiting,
    intro
  },
  data() {
    return {
      // true if sockets have successfully connected to the server
      connectionStatus: false,
      // stores socket instance
      socket: null,
      // true when host has paused the game
      showPauseDialog: false,
      // used for host to control which view the player is on
      currentView: 'waiting',
      // false if no host can be found in room
      hostPresent: true,
      // rhyming words in prompt
      wordsInPrompt: [],
      // contains nicknames of players that have submitted a response that is being voted on
      // hence called a candidate
      candidates: []
    }
  },
  destroyed() {
    if (this.socket?.connected) this.forceDisconnect()
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
            this.socket.emit('player-join', this.$store.state.nickname)
            this.hostCountdown()
            this.socket.emit('report-to-players')
          }
        })
      })
      this.socket.on('visibility-handler', hostVisibility => {
        this.showPauseDialog = hostVisibility === 'hidden'
      })
      this.socket.on('change-view', newView => {
        this.currentView = newView
      })
      this.socket.on('roll-call', () => {
        this.socket.emit('player-join', this.$store.state.nickname)
        this.hostCountdown()
      })
      this.socket.on('host-present', () => {
        this.hostPresent = true
      })
      this.socket.on('report-to-host', () => {
        this.socket.emit('player-join', this.$store.state.nickname)
      })
      this.socket.on('new-words', (newWords) => {
        this.wordsInPrompt = newWords
      })
      this.socket.on('candidate-list', (newCandidates) => {
        this.candidates = newCandidates
      })
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    },
    hostCountdown() {
      this.hostPresent = false
      setTimeout(() => {
        if (!this.hostPresent) {
          if (this.socket?.connected) this.forceDisconnect()
          this.$router.push('/')
        }
      }, 3000)
    }
  }
}
</script>

<style>

</style>