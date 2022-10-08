<template>
  <div class="center"> 
    <component
      :is="currentView"
      :wordsInPrompt="wordsInPrompt"
      :socketInstance="socket"
    ></component>

    <!-- Dialog Boxes -->
    <host-left :visible="hostLeft" />
    <game-paused :visible="showPauseDialog" :reason="'not-visible'" />
  </div>
</template>

<script>
import vote from '../components/GameplayViews/VotingView.vue'
import respond from '../components/GameplayViews/SubmitResponse.vue'
import waiting from '../components/GameplayViews/WaitingView.vue'
import intro from '../components/GameplayViews/IntroView.vue'
import recap from '../components/GameplayViews/RecapView.vue'
import outro from '../components/GameplayViews/OutroView.vue'

// dialogs
import HostLeft from '../components/GameplayViews/Dialogs/HostLeft.vue'
import GamePaused from '../components/GameplayViews/Dialogs/GamePaused.vue'

import io from 'socket.io-client'

export default {
  components: {
    vote,
    respond,
    waiting,
    intro,
    recap,
    outro,
    HostLeft,
    GamePaused
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
      // false if no host can be found in room, is set to false every rollcall
      hostPresent: true,
      // hostLeft is different as it only turns false when hostPresent has stayed false for more than n seconds
      hostLeft: false,
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
            this.socket.emit('get-current-view')
          }
        })
      })
      this.socket.on('visibility-handler', hostVisibility => {
        this.showPauseDialog = hostVisibility === 'hidden'
      })
      this.socket.on('change-view', newView => {
        this.currentView = newView
        window.scrollTo(0, 0)
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
      // gives host 3 seconds to set hostPresent back to true
      setTimeout(() => {
        this.hostLeft = !this.hostPresent
      }, 3000)
    }
  },
  watch: {
    hostLeft(v) {
      if (v) {
        this.forceDisconnect()
      }
    }
  }
}
</script>

<style>

</style>