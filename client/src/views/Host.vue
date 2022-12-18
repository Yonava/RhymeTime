<template>  
  <div>
    <div 
      v-if="currentView !== Views.waiting"
      class="room-id-display center ma-2 px-2 py-1"
    >
      <div style="display: flex; flex-direction: row">
        <div
          v-for="(letter, index) in 'RhymeTime'"
          :key="letter.id"
          :style="`animation-delay: ${index * 0.3}s; line-height: 1;`"
          :class="`${rhymetimeTextAnimation} white--text font-weight-black text-p`"
        >
          {{ letter }}
        </div>
      </div>
      <div 
        class="white--text font-weight-black text-h4"
        style="line-height: 1"
      >
        {{ roomId }} 
      </div>
    </div>
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
      :roundCount="roundCount"
      :totalRounds="totalRounds"
      :playerList="playerList"
      :currentView="currentView"
      :audienceCount="audienceCount"
      @update-total-rounds="totalRounds = $event"
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
        /* UNCOMMENT FOR TESTING
        {
          name: 'Jack',
          clientId: '123',
          pfp: '3',
          color: 'red'
        },
        {
          name: 'Josh',
          clientId: '456',
          pfp: '4',
          color: 'green'
        },
        {
          name: 'Yona',
          clientId: '789',
          pfp: '2',
          color: 'blue'
        },
        {
          name: 'William',
          clientId: '101112',
          pfp: '1',
          color: 'yellow'
        },
        {
          name: 'Prof. Banae',
          clientId: '131415',
          pfp: '1',
          color: 'purple'
        },
        {
          name: 'Prof. Datta',
          clientId: '161718',
          pfp: '1',
          color: 'orange'
        }
        */
      ],
      // prompt responses each round are stored here. response obj format { player: player, response: string }
      promptResponses: [],
      // stores what round the game is on
      roundCount: 1,
      // number of rounds that are to be played
      totalRounds: 4,
      // responses that won in voting round
      winningResponses: [],
      // true if page is not visible (using visibilitychange event listener)
      isPageHidden: false,
      // if host selects to pause game
      manuallyPaused: false,
      // number of player spots offered in room
      numOfPlayerSpots: 6,
      // how many members are in the audience
      audienceCount: 0,
      // contains the class for the rhymetime text animation
      rhymetimeTextAnimation: 'rhymetime-text-animation',
      // queue of players attempting to join
      joinQueue: [],

      Views
    }
  },
  destroyed() {
    if (this.socket?.connected) this.socket.disconnect()
    document.removeEventListener('visibilitychange', this.modelVisibility)
  },
  mounted() {
    this.connectSocket()
    document.addEventListener('visibilitychange', this.modelVisibility)
    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'p') {
        this.manuallyPaused = !this.manuallyPaused
      }
    })

    // controls the join queue
    this.processJoinQueue = setInterval(() => {
      // if there are players in the queue, handle the first one
      if (this.joinQueue.length) {
        const PLAYER = this.joinQueue.shift()
        this.handlePlayerJoin(PLAYER)
      }
      // ensure everyone is out of join queue before closing the interval
      if (this.roomFull && !this.joinQueue.length) {
        clearInterval(this.processJoinQueue)
      }
    }, 250)

    // controls the rhymetime text animation
    setInterval(() => {
      this.rhymetimeTextAnimation = ''
      setTimeout(() => {
        this.rhymetimeTextAnimation = 'rhymetime-text-animation'
      }, 100)
    }, 8000)
  },
  computed: {
    isPaused() {
      return this.isPageHidden || this.manuallyPaused
    },
    pausePlayIcon() {
      return this.isPaused ? 'mdi-play' : 'mdi-pause'
    },
    roomFull() {
      return this.numOfPlayerSpots <= this.playerList.length
    },
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
            this.socket.emit('host-present')
          }
        })
      })
      this.socket.on('player-join', player => {
        if (!this.roomFull) {
          this.joinQueue.push(player)
        } else {
          this.handlePlayerJoin(player)
        }
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
      this.socket.on('audience-broadcast-current-view', () => {
        this.socket.emit('audience-change-view', this.currentView)
        // called only once by the audience client on join,
        // TODO: find an efficient way to decrement audience count
        this.audienceCount++
      })
    },
    modelVisibility() {
      this.isPageHidden = document.visibilityState === 'hidden'
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
    handlePlayerJoin() {
      // game has started or room is full, send player to audience
      if (this.currentView !== Views.waiting || this.roomFull) {
        this.socket.emit('kick-player', {
          clientId: player.clientId,
          redirect: {
            name: 'audience',
            query: {
              room: this.roomId
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
              room: this.roomId
            }
          }
        })
        return
      }
      // player is allowed to join
      this.playerList.push(player)
      this.socket.emit('confirm-player-entry', player.clientId)
    },
    kickPlayer(clientId) {
      let playerIndex = this.playerList
        .findIndex((player) => player.clientId === clientId)
      // handle player kicking
      this.socket.emit('kick-player', {
        clientId,
        redirect: {
          name: 'join'
        }
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

<style scoped>
.room-id-display {
  position: fixed;
  top: 0; 
  left: 0; 
  z-index: 99; 
  background: rgba(0,0,0,0.1); 
  border-radius: 10px; 
  border: 1px solid black; 
  display: flex; 
  flex-direction: column;
}
.rhymetime-text-animation {
  animation: move-text 1s ease-in-out;
}
@keyframes move-text {
  0% { 
    transform: translateY(0px);
  }
  50% { 
    transform: translateY(-4px);
  }
  100% { 
    transform: translateY(0px);
  }
}
</style>