<template>  
  <div>
    <component
      :is="currentView"
      :playerList="playerList"
      :promptResponses="promptResponses"
      :socketInstance="socket"
      :winningResponses="winningResponses"
      :isPaused="isPaused"
      :numOfPlayerSpots="numOfPlayerSpots"
      @toggle-pause="manuallyPaused = !manuallyPaused"
      @round-winner="winningResponses.push($event)"
      @change-view="currentView = $event"
      @round-over="roundOver"
      @round-change="totalRounds = $event"
      @restart-game="restartGame"
      @kick="kickPlayer($event)"
    ></component>
    <PauseMenu
      :visible="manuallyPaused" 
      :currentView="currentView"
      :roundCount="roundCount"
      :totalRounds="totalRounds"
      :playerList="playerList"
      @unpause="manuallyPaused = false"
    />
  </div>
</template>

<script>
import waiting from '../components/HostViews/Waiting.vue'
import respond from '../components/HostViews/Respond.vue'
import vote from '../components/HostViews/Vote.vue'
import tutorial from '../components/HostViews/Tutorial.vue'
import recap from '../components/HostViews/Recap.vue'
import endScreen from '../components/HostViews/EndScreen.vue'

import PauseMenu from '../components/HostViews/HostSubComponents/PausedDialog.vue'

import { Views } from '../utils/Views'
import io from 'socket.io-client'

export default {
  components: {
    waiting,
    respond,
    vote,
    tutorial,
    recap,
    endScreen,
    PauseMenu
  },
  data() {
    return {
      // stores socket instance
      socket: null,
      // sets the current view of the game, emits to players
      currentView: Views.waiting,
      // playerlist contains player objects for every connected player
      playerList: [
        {
            name: 'Safi',
            color: 'orange',
            pfp: '8',
            clientId: 4
          },
           {
            name: 'Yona',
            color: 'yellow',
            pfp: '7',
            clientId: 5
          },
        {
          name: 'Jack',
          color: 'red',
          pfp: '2',
          clientId: 1
        },
        {
          name: 'Josh',
          color: 'blue',
          pfp: '3',
          clientId: 2
        },
        {
          name: 'Thomas',
          color: 'green',
          pfp: '6',
          clientId: 3
        },
        {
          name: 'Chris',
          color: 'yellow',
          pfp: '7',
          clientId: 6
        },
       
          
      ],
      // prompt responses each round are stored here. response obj format { player: player, response: string }
      promptResponses: [],
      // stores what round the game is on
      roundCount: 1,
      // number of rounds that are to be played
      totalRounds: 3,
      // responses that won in voting round
      winningResponses: [
        {
          player: {
            name: 'Jack',
            color: 'red',
            pfp: '2',
            clientId: 1
          },
          response: 'I am a response from Jack and I am the best response in the world lol i can go on forever, i am taking up space to porve that yonas ui can handle it'
        },
        {
          player: {
            name: 'Josh',
            color: 'blue',
            pfp: '3',
            clientId: 2
          },
          response: 'I am a response from Joshcan go on forever, i am taking up space to porve that yonas ui cacan go on forever, i am taking up space to porve that yonas ui cacan go on forever, i am taking up space to porve that yonas ui ca'
        },
        {
          player: {
            name: 'Thomas',
            color: 'green',
            pfp: '6',
            clientId: 3
          },
          response: 'I am a response from Thomascan go on forever, i am taking up space to porve that yonas ui cacan go on forever, i am taking up space to porve that yonas ui cacan go on forever, i am taking up space to porve that yonas ui ca'
        },
        {
          player: {
            name: 'Chris',
            color: 'yellow',
            pfp: '7',
            clientId: 6
          },
          response: 'I am a response from Chris'
        },
        {
          player: {
            name: 'Safi',
            color: 'orange',
            pfp: '8',
            clientId: 4
          },
          response: 'I am a response from safi'
        },
        {
          player: {
            name: 'Yona',
            color: 'yellow',
            pfp: '7',
            clientId: 5
          },
          response: 'I am a response from yona'
        },
      ],
      // true if page is not visible (using visibilitychange event listener)
      isPageHidden: false,
      // if host selects to pause game
      manuallyPaused: false,
      // number of player spots offered in room
      numOfPlayerSpots: 6
    }
  },
  destroyed() {
    if (this.socket?.connected) this.socket.disconnect()
    document.removeEventListener('visibilitychange', this.modelVisibility)
  },
  mounted() {
    this.connectSocket()
    document.addEventListener('visibilitychange', this.modelVisibility)
  },
  computed: {
    isPaused() {
      return this.isPageHidden || this.manuallyPaused
    },
    pausePlayIcon() {
      return this.isPaused ? 'mdi-play' : 'mdi-pause'
    }
  },
  methods: {
    connectSocket() {
      const SOCKET_URL = window.location.href.includes('localhost') ? 'http://localhost:3000' : '/'
      if (this.socket?.connected) return
      this.socket = io(SOCKET_URL)
      this.socket.on('connect', () => { 
        this.socket.emit('join-room', this.$store.state.roomid, (response) => {
          if (response === 'connected') {
            this.socket.emit('host-present')
          }
        })
      })
      this.socket.on('player-join', player => {
        // game has started or room is full, send player to audience
        const ROOM_FULL = this.numOfPlayerSpots <= this.playerList.length
        if (this.currentView !== Views.waiting || ROOM_FULL) {
          this.socket.emit('kick-player', {
            clientId: player.clientId,
            redirect: {
              name: 'audience',
              query: {
                room: this.$store.state.roomid
              }
            }
          })
          return
        }

        // blocks duplicate player names
        const DUPLICATE_NAME = this.playerList.some(p => p.name === player.name)
        if (DUPLICATE_NAME) {
          this.socket.emit('kick-player', {
            clientId: player.clientId,
            redirect: {
              name: 'join',
              query: {
                err: 'nickname_taken',
                room: this.$store.state.roomid
              }
            }
          })
          return
        }

        // player is allowed to join
        this.playerList.push(player)
      })
      this.socket.on('disconnect-event', () => {
        this.socket.emit('host-present')
      })
      this.socket.on('player-object-change', newPlayerObject => {
        let playerIndex = this.playerList
          .findIndex((player) => player.clientId === newPlayerObject.clientId)
        if (playerIndex === -1) {
          return console.warn(`
          Player with unrecongized clientId is 
          attempting to make changes to their player object`)
        }
        this.playerList.splice(playerIndex, 1, newPlayerObject)
      }) 
      this.socket.on('broadcast-game-state', () => {
        this.socket.emit('host-present')
        this.socket.emit('change-view', this.currentView)
        this.emitPausePackage()
        // figure out best way to send over new-words, and candidate-list
      })
    },
    modelVisibility() {
      this.isPageHidden = document.visibilityState === 'hidden'
    },
    forceDisconnect() {
      this.socket.disconnect()
    },
    // called by 'recap' when the round recap is over
    roundOver() {
      if (this.roundCount === this.totalRounds) {
        return this.currentView = Views.endScreen       
      }

      // resets responses for new round
      this.promptResponses = []

      this.roundCount++
      this.currentView = Views.respond
      // make sessionStorage back-up of game state here
    },
    restartGame() {
      this.roundCount = 1
      this.currentView = Views.waiting
      this.winningResponses = []
      this.promptResponses = []
    },
    emitPausePackage() {
      let pausePackage = { gamePaused: this.isPaused }
      if (this.manuallyPaused) pausePackage.reason = 'manual-pause'
      else if (this.isPageHidden) pausePackage.reason = 'not-visible'
      else pausePackage.reason = 'not-paused'
      this.socket.emit('pause-state', pausePackage)
    },
    kickPlayer(clientId) {
      let playerIndex = this.playerList
        .findIndex((player) => player.clientId === clientId)
      // handle player kicking
      this.socket.emit('kick-player', {
        clientId,
        redirect: '/'
      })
      // remove from playerlist and replace with Open Spot
      this.playerList.splice(playerIndex, 1)
    }
  },
  watch: {
    currentView(v) {
      // only emits view down to player if v is a registered and valid component
      if (Object.keys(this.$options.components).includes(v)) {
        this.socket.emit('change-view', v)
      } else {
        console.error(`${v} is not a valid component: host refused socket emit`)
      }
    },
    isPaused() {
      this.emitPausePackage()
    }
  }
}
</script>