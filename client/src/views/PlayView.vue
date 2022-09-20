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
    <v-btn @click="connectSocket" color="green" dark>connect socket</v-btn>
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
  methods: {
    connectSocket() {
      if (this.socket?.connected) return
      this.socket = io("https://its-rhyme-time.herokuapp.com/")
      this.socket.on('connect', () => {
        this.socket.emit('join-room', this.$route.query.room, (response) => {
          if (response === 'connected') {
            this.connectionStatus = true
            this.socket.emit('player-join', this.username)
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
        this.socket.emit('player-join', this.username)
        this.hostCountdown()
      })
      this.socket.on('host-present', () => {
        this.hostPresent = true
      })
      this.socket.on('report-to-host', () => {
        this.socket.emit('player-join', this.username)
      })
    },
    forceDisconnect() {
      this.socket.disconnect()
      this.connectionStatus = false
    },
    hostCountdown() {
      this.hostPresent = false
      setTimeout(() => {
        if (!this.hostPresent) this.$router.push('/')
      }, 3000)
    }
  }
}
</script>

<style>

</style>