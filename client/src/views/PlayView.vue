<template>
  <div class="center">   
    <div class="text-h4 mb-5">Player View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn>  
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <p>Current View: {{ currentView }}</p>
    <v-text-field
      v-model="username"
      label="Enter name"
    ></v-text-field>
    <v-btn @click="connectSocket">connect socket</v-btn>
    <br>
    <v-btn color="red" dark @click="forceDisconnect">Force Disconnect</v-btn>
    <v-dialog
      v-model="showPauseDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Game Foribly Paused!
        </v-card-title>
        <v-card-text>
          Tell the fucking host to switch the screen back on so you can resume the dman game
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
export default {
  data() {
    return {
      connectionStatus: false,
      socket: null,
      showPauseDialog: false,
      currentView: 0,
      username: '',
      hostPresent: true
    }
  },
  mounted() {
    
  },
  methods: {
    connectSocket() {
      if (this.socket?.connected) return
      this.socket = io('http://localhost:3000')
      this.socket.on('connect', () => {
        this.connectionStatus = true
        this.socket.emit('player-join', this.username)
      })
      this.socket.on('visibility-handler', hostVisibility => {
        this.showPauseDialog = hostVisibility === 'hidden'
      })
      this.socket.on('change-view', newView => {
        this.currentView = newView
      })
      this.socket.on('roll-call', () => {
        this.socket.emit('player-join', this.username)
        this.hostCountdown()
      })
      this.socket.on('host-present', () => {
        this.hostPresent = true
      })
    },
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    buttonEmit() {
      this.socket.emit('btn', 1)
    },
    forceDisconnect() {
      this.socket.disconnect()
    },
    hostCountdown() {
      console.log(this.hostPresent)
      this.hostPresent = false
      setTimeout(() => {
        console.log(this.hostPresent)
        if (!this.hostPresent) this.$router.push('/')
      }, 3000)
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.emitVisibility)
  }
}
</script>

<style>

</style>