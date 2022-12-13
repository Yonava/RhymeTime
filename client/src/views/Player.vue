<template>
  <div> 
    <!-- Loading screen -->
    <div 
      v-if="!hasHostResponded"
      class="loading-container center"
    >
      <v-progress-circular
        size="70"
        width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </div>
    <component
      v-else
      :is="currentView"
      :wordsInPrompt="wordsInPrompt"
      :socketInstance="socket"
      :clientId="clientId"
      :connectedToRoom="connectedToRoom"
      :connectedViaToken="connectedViaToken"
      @connected-to-room="connectedToRoom = true"
    ></component>

    <!-- Dialog Boxes -->
    <SessionDisbanded 
      :visible="hostLeft" 
      :hasHostResponded="hasHostResponded"
    />
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
import SessionDisbanded from '../components/PlayerViews/Dialogs/SessionDisbanded.vue'
import GamePaused from '../components/PlayerViews/Dialogs/GamePaused.vue'

import { Views } from '../utils/Views'
import io from 'socket.io-client'
import Tokens from '../api/tokens'

export default {
  components: {
    vote,
    respond,
    waiting,
    tutorial,
    recap,
    endScreen,
    SessionDisbanded,
    GamePaused
  },
  data() {
    return {
      // stores socket instance
      socket: null,
      // used to determine if player is connected to a room
      connectedToRoom: false,
      // contains data received from host through pause-state socket endpt
      pauseData: { gamePaused: false, reason: 'not-paused' },
      // used for host to control which view the player is on
      currentView: Views.vote,
      // false if no host can be found in room, is set to false every rollcall
      hostPresent: false,
      // hostLeft is different as it only turns false when hostPresent has stayed false for more than n seconds
      hostLeft: false,
      // true once first host ping has been received
      hasHostResponded: false,
      // rhyming words in prompt
      wordsInPrompt: [],
      // id that the client stores so host can uniquely identify it
      clientId: Math.floor(Math.random() * 9284724),
      // true if player has connected via token
      connectedViaToken: false
    }
  },
  async created() {
    // checks if client has a token that can be
    // used to join a previously connected session
    let roomToken = localStorage.getItem('room-token')
    if (roomToken) {
      try {
        let { clientId, roomId } = await Tokens.verify(roomToken)

        // if room id is defined but doesnt equal roomId in token
        if (this.$store.state.roomid && this.$store.state.roomid !== roomId) {
          throw 'Room id in token does not match room id in store'
        }
        this.$store.state.roomid = roomId
        this.clientId = clientId
        this.connectedViaToken = true
      } catch (err) {
        console.log(err)
        localStorage.removeItem('room-token')
      }
    } else if (!this.$store.state.roomid) {
      // if no room id is defined, generate a new one
      this.$router.push({ 
        name: 'join'
      })
    }
    // connect to socket
    this.connectSocket()
  },
  destroyed() {
    if (this.socket?.connected) this.forceDisconnect()
  },
  computed: {
    roomId() {
      return this.$store.state.roomid
    }
  },
  methods: {
    connectSocket() {
      const SOCKET_URL = window.location.href.includes('localhost') ? 'http://localhost:3000' : '/'
      if (this.socket?.connected) return
      this.socket = io(SOCKET_URL)
      this.socket.on('connect', () => {
        this.socket.emit('join-room', this.roomId, (response) => {
          if (response === 'connected') {
            this.establishSocketListeners()
            this.hostCountdown()
            this.socket.emit('get-game-state')
          }
        })
      })
    },
    establishSocketListeners() {
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
        this.hasHostResponded = true
      })
      this.socket.on('new-words', (newWords) => {
        this.wordsInPrompt = newWords
      })
      this.socket.on('kick-listener', (kickReq) => {
        if (kickReq.clientId === this.clientId) {
          localStorage.removeItem('room-token')
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

<style scoped>
.loading-container{
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgb(255, 227, 176);
}
</style>