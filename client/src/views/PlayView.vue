<template>
  <div class="center">   
    <div class="text-h4 mb-5">Player View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn>  
    <p>Socket Connected: {{ connectionStatus }}</p> 
    <p>Current View: {{ currentView }}</p>
    <v-btn @click="disc">disconnect socket</v-btn>
    <v-dialog
      v-model="showPauseDialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
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
      currentView: 0
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000')
    this.socket.on('connect', () => {
      this.connectionStatus = true
    })
    this.socket.on('visibility-handler', hostVisibility => {
      this.showPauseDialog = hostVisibility === 'hidden'
    })
    this.socket.on('change-view', newView => {
      this.currentView = newView
    })
  },
  methods: {
    emitVisibility() {
      this.socket.emit('visibility-handler', document.visibilityState)
    },
    buttonEmit() {
      this.socket.emit('btn', 1)
    },
    forceDisconnect() {
      this.socket.disconnect()
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.emitVisibility)
  }
}
</script>

<style>

</style>