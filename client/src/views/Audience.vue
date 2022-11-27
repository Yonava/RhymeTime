<template>
  <div>
    <div 
      v-if="receivedCurrentView"
      class="center"
    >
      <v-btn text color="red">
        <v-icon>mdi-chevron-left</v-icon>
        <span>Leave Room</span>
      </v-btn>
      <component
        :is="currentView"
        :socketInstance="socket"
      ></component>
    </div>
    <div 
      v-else
      class="center"
      style="width: 100vw; height: 100vh;"
    >
      <v-progress-circular
        indeterminate
        color="orange"
        size="70"
        width="7"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import vote from '../components/AudienceViews/Vote.vue'
import respond from '../components/AudienceViews/Respond.vue'
import waiting from '../components/AudienceViews/Waiting.vue'
import tutorial from '../components/AudienceViews/Tutorial.vue'
import recap from '../components/AudienceViews/Recap.vue'
import endScreen from '../components/AudienceViews/EndScreen.vue'

import { Views } from '../utils/Views'
import io from 'socket.io-client'

export default {
  components: {
    vote,
    respond,
    waiting,
    tutorial,
    recap,
    endScreen
  },
  data() {
    return {
      currentView: Views.waiting,
      socket: null,
      receivedCurrentView: false
    }
  },
  mounted() {
    // if client has not received a view from the host in 4 seconds
    // send user back to join page
    setTimeout(() => {
      if (!this.receivedCurrentView) {
        this.$router.push({
          name: 'join',
          query: {
            room: this.roomId,
            err: 'audience_no_host'
          }
        })
      }
    }, 4000)
  },
  computed: {
    roomId() {
      return this.$route.query.room
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
            this.socket.emit('audience-get-current-view')
          }
        })
      })
    },
    establishSocketListeners() {
      this.socket.on('change-view', (view) => {
        this.currentView = view
      })
      this.socket.on('audience-change-view', (view) => {
        this.currentView = view
        this.receivedCurrentView = true
      })
    }
  }
}
</script>