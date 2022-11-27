<template>
  <div>
    <component
      v-if="receivedCurrentView"
      :is="currentView"
      :socketInstance="socket"
    ></component>
    <div v-else>
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