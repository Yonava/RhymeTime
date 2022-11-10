<template>
  <div class="center"> 
    <component
      :is="currentView"
      :wordsInPrompt="wordsInPrompt"
      :socketInstance="socket"
      :clientId="clientId"
    ></component>

    <!-- Dialog Boxes -->
    <host-left :visible="hostLeft" />
    <game-paused 
      :visible="pauseData.gamePaused" 
      :reason="pauseData.reason" 
    />
  </div>
</template>

<script>
import vote from '../components/PlayerViews/Vote.vue'
import respond from '../components/PlayerViews/Respond.vue'
import waiting from '../components/PlayerViews/Waiting.vue'
import tutorial from '../components/PlayerViews/Tutorial.vue'
import recap from '../components/PlayerViews/Recap.vue'
import endScreen from '../components/PlayerViews/EndScreen.vue'

// dialogs
import HostLeft from '../components/PlayerViews/Dialogs/HostLeft.vue'
import GamePaused from '../components/PlayerViews/Dialogs/GamePaused.vue'

import { Views } from '../utils/Views'
import io from 'socket.io-client'

export default {
  components: {
    vote,
    respond,
    waiting,
    tutorial,
    recap,
    endScreen,
    HostLeft,
    GamePaused
  },
  data() {
    return {
      // stores socket instance
      socket: null,
      // contains data received from host through pause-state socket endpt
      pauseData: { gamePaused: false, reason: 'not-paused' },
      // used for host to control which view the player is on
      currentView: Views.waiting,
      // false if no host can be found in room, is set to false every rollcall
      hostPresent: true,
      // hostLeft is different as it only turns false when hostPresent has stayed false for more than n seconds
      hostLeft: false,
      // rhyming words in prompt
      wordsInPrompt: [],
      // contains nicknames of players that have submitted a response that is being voted on
      // hence called a candidate
      candidates: [],
      // id that the client stores so host can uniquely identify it
      clientId: 0
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
            this.clientId = Math.floor(Math.random() * 9284724)
            this.socket.emit('player-join', {
              playerName: this.$store.state.nickname,
              clientId: this.clientId
            })
            this.hostCountdown()
            this.socket.emit('get-game-state')
          }
        })
      })
      this.socket.on('pause-state', pausedState => {
        this.pauseData = pausedState
      })
      this.socket.on('change-view', newView => {
        this.currentView = newView
        window.scrollTo(0, 0)
      })
      this.socket.on('disconnect-event', () => {
        this.hostCountdown()
      })
      this.socket.on('host-present', () => {
        this.hostPresent = true
      })
      this.socket.on('new-words', (newWords) => {
        this.wordsInPrompt = newWords
      })
      this.socket.on('candidate-list', (newCandidates) => {
        this.candidates = newCandidates
      })
      this.socket.on('kick-listener', (kickReq) => {
        if (kickReq.clientId === this.clientId) {
          this.$router.push(kickReq.redirect)
        }
      })
    },
    forceDisconnect() {
      this.socket.disconnect()
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